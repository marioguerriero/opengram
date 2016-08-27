var express = require('express');
var bodyParser = require('body-parser');
var bcrypt = require('bcrypt-nodejs');
var jwt = require("jsonwebtoken");

var config = require("./../config");

var User = require("./../models/user");

var router = express.Router();

router.use(bodyParser.urlencoded({extended:false}));
router.use(bodyParser.json());

// Get user's details
router.get('/user/:id', function(req, res) {
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
router.put('/user/:id', function(req, res) {
    var id = req.params.id;

    if(!id)
        return res.sendStatus(400); // Bad Request

    var user = req.body;

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
router.delete("/user/:id", function(req, res){
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

// Authentication end point
router.post("/login", function(req, res) {
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
                _id: user._id,
                username: user.username,
                token: token
            });
        });
    });
});

module.exports = router;