import express from "express";
import bodyParser from "body-parser";
import jwtMiddleware from './jwt-middleware';
import Post from "./../models/post";
import User from "./../models/user";

var router = express.Router();

router.use(bodyParser.urlencoded({extended:false}));
router.use(bodyParser.json());

router.get("/timeline", jwtMiddleware, function(req, res) {
  let username = req.user.username;

  User.findOne({ username: username }, function(err, user) {
    if(err)
      return res.sendStatus(400); // Bad Request

    // Find all posts of all following users
    let idList = [ user._id ]
    if(user.following.length > 0) idList = idList.concat(user.following);
    Post.find({ publisher: { "$in" : idList } })
      .sort({ date: -1 })
      .exec(function(err, posts) {
        return res.json({
            posts
        });
      });
  });
});

export default router;
