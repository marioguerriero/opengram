var express = require('express');
var bodyParser = require('body-parser');

var Post = require("./../models/post");

var router = express.Router();

router.use(bodyParser.urlencoded({extended:false}));
router.use(bodyParser.json());

router.get("/r/posts", function(req, res) {
    Post.find({publisher:req.body.username}, function(err, posts) {
        return res.json({
            posts: posts
        });
    });
});

router.get("/r/post/:id", function(req, res) {
    Post.findOne({_id:req.params.id}, function(err, post) {
        if(err) return res.sendStatus(404);
        else return res.json(post);
    });
});

router.post("/r/posts", function(req, res) {
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

module.exports = router;