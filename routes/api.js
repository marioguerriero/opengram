var express = require("express");
var bodyParser = require("body-parser");
var bcrypt = require("bcrypt-nodejs");
var jwt = require("jsonwebtoken");
var expressJwt = require("express-jwt");

var config = require("./../config");

var User = require("./../models/user");
var Post = require("./../models/post");

var api = express.Router();

api.use(bodyParser.urlencoded({extended:false}));
api.use(bodyParser.json());

api.use(require('./api_user'));
api.use('', require('./api_post'));

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