var express = require("express");
var bodyParser = require("body-parser");
var bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
var expressJwt = require("express-jwt");

var config = require("./../config");

var User = require("./../models/user");
var Post = require("./../models/post");

var api = express.Router();

api.use(bodyParser.urlencoded({extended:false}));
api.use(bodyParser.json());

api.post("/registration", function(req, res){
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

// Authentication end point
api.post("/login", function(req, res) {
  if(!req.body.username || !req.body.password) {
    return res.sendStatus(400); // Bad Request
  }

  User.findOne({username: req.body.username}, function(err, user) {
    if(err || !user) {
      return res.sendStatus(401); // Unauthorized
    }

    // Check if password match
    bcrypt.compare(req.body.password, user.password, function(err, result) {
      if(err || !result) {
        return res.sendStatus(401); // Unauthorized
      }

      // Valid credentials, let's generate a token
      var token = jwt.sign({username:req.body.username}, config.secret, {
        expiresIn: "7d"
      });
      res.json({
        user: user._id,
        token: token
      });
    });
  });
});

// Filter for restricted resources
api.all("/r/*", expressJwt({secret:config.secret}));

api.get("/r/posts", function(req, res) {
  Post.find({publisher:req.body.username}, function(err, posts) {
    return res.json({
      posts: posts
    });
  });
});

api.get("/r/post/:id", function(req, res) {
  Post.findOne({_id:req.params.id}, function(err, post) {
    if(err) return res.sendStatus(404);
    else return res.json(post);
  });
});

api.post("/r/posts", function(req, res) {
  // Create and save the post
  var post = new Post({
    publisher: req.body.username,
    media: req.body.media,
    message: req.body.message,
    mentions: req.body.mentions,
    tags: req.body.tags
  });

  post.save(function(err, post) {
    if(err) return res.sendStatus(500); // Internal Server
    return res.sendStatus(200);
  });
});

api.get("/r/user/:id", function(req, res) {
  Post.findOne({_id:req.params.id}, function(err, user) {
    if(err) return res.sendStatus(404);
    else return res.json(user);
  });
});

module.exports = api;
