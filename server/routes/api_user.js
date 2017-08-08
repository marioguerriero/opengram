import express from 'express';
import bodyParser from 'body-parser';
import jwtMiddleware from './jwt-middleware';
import config from "./../config";
import User from "./../models/user";

var router = express.Router();

router.use(bodyParser.urlencoded({extended:false}));
router.use(bodyParser.json());

// Get user's details
router.get('/user/:id', jwtMiddleware, function(req, res) {
  var id = req.params.id;

  if(!id)
    return res.sendStatus(400); // Bad Request

  User.findOne({ _id: id }, function(err, user) {
    if(err)
      res.sendStatus(404);
    else {
      res.json(user);
    }
  });
});

// Create new users
router.post("/users", function(req, res){
    if(!req.body.username || !req.body.password) {
        return res.sendStatus(400); // Bad Request
    }

    // Build new User object
    var user = new User({
        username: req.body.username,
        password: req.body.password
    });

    // Check wheter the username was already taken
    User.count({username: user.username}, function(err, count) {
        if(count > 0) {
            return res.sendStatus(409); // Conflict
        }
        // Register in the database
        user.save(function(err, user) {
            if(err) return res.sendStatus(500); // Internal Server Error
            return res.sendStatus(200);
        });
    });
});

// Edit user details
router.put('/user/:id', jwtMiddleware, function(req, res) {
    var id = req.params.id;
    var user = req.body;

    if(!id || !user)
        return res.sendStatus(400); // Bad Request

    // Id must not be updated in any way
    delete user._id;

    User.findOneAndUpdate({ _id: id}, user, { new: true }, function (err, user) {
        if(err)
            res.sendStatus(500);
        else
            res.json(user);
    });
});

// Delete user
router.delete("/user/:id", jwtMiddleware, function(req, res){
    var id = req.params.id;

    if(!id)
        return res.sendStatus(400); // Bad Request

    User.remove({ _id: id }, function (err) {
        if(err)
            res.sendStatus(404);
        else {
            res.sendStatus(200);
        }
    });
});

// Follow an user
router.post("/user/follow/:id", jwtMiddleware, function(req, res){
    var id = req.params.id;

    if(!id || !req.user || !req.user.username)
      return res.sendStatus(400); // Bad Request

    // First obtain the requesting user
    User.findOneAndUpdate({ username: req.user.username },
        { $push: { following: id } }, { new: true }, function(err, user) {
      if(err)
        res.sendStatus(500);
      else
        res.json(user);
    });
});

// Defollow an user
router.delete("/user/follow/:id", jwtMiddleware, function(req, res){
    var id = req.params.id;

    if(!id || !req.user || !req.user.username)
      return res.sendStatus(400); // Bad Request

    // First obtain the requesting user
    User.findOneAndUpdate({ username: req.user.username },
        { $pull: { following: id } }, { new: true }, function(err, user) {
      if(err)
        res.sendStatus(500);
      else
        res.json(user);
    });
});

export default router;
