import express from 'express';
import bodyParser from 'body-parser';
import jwtMiddleware from './jwt-middleware';
import Post from "./../models/post";

var router = express.Router();

router.use(bodyParser.urlencoded({extended:false}));
router.use(bodyParser.json());

// Query posts
router.get("/posts", jwtMiddleware, function(req, res) {
    if(!req.body)
        return res.sendStatus(400); // Bad request

    Post.find(req.body, function(err, posts) {
        return res.json({
            posts: posts
        });
    });
});

// Create posts
router.post("/posts", jwtMiddleware, function(req, res) {
    if(!req.body || !req.body.publisher)
        return res.sendStatus(400); // Bad request

    new Post(req.body).save(function(err, post) {
        if (err) return res.sendStatus(500); // Internal Server
        return res.json(post);
    });
});

// Get post details
router.get("/post/:id", jwtMiddleware, function(req, res) {
    var id = req.params.id;

    if(!id)
        return res.sendStatus(400); // Bad Request

    Post.findOne({ _id: req.params.id }, function(err, post) {
        if(err) return res.sendStatus(404);
        else return res.json(post);
    });
});

// Edit post details
router.put("/post/:id", jwtMiddleware, function(req, res) {
    var id = req.params.id;
    var post = req.body;

    if(!id || !post)
        return res.sendStatus(400); // Bad Request

    // Id must not be updated in any way
    delete post._id;

    Post.findOneAndUpdate({ _id: id}, post, { new: true }, function (err, user) {
        if(err)
            res.sendStatus(500);
        else
            res.json(post);
    });
});

// Delete post
router.delete("/post/:id", jwtMiddleware, function(req, res) {
    var id = req.params.id;

    if(!id)
        return res.sendStatus(400); // Bad Request

    // Look for the post to delete
    Post.findOneAndUpdate({ _id: id}, post, { new: true }, function (err, user) {
        if(err)
            res.sendStatus(500);
        else {
            Post.remove({ _id: id }, function (err) {
                if(err)
                    res.sendStatus(404);
                else {
                    res.json(post);
                }
            });
        }
    });
});

export default router;
