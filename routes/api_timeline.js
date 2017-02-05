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
    Post.find({ publisher: { "$in" : user.following } })
      .sort({ date: -1 })
      .exec(function(err, posts) {
        return res.json({
            posts: posts
        });
      });
  });
});

export default router;
