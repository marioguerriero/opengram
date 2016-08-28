var express = require('express');
var bodyParser = require('body-parser');
var expressJwt = require('express-jwt');

var config = require("./../config");

var User = require("./../models/user");

var router = express.Router();

router.use(bodyParser.urlencoded({extended:false}));
router.use(bodyParser.json());

var jwtMiddleware = expressJwt({
    secret: config.secret,
    getToken: function(req) {
        return req.body.token || req.query.token || req.headers['x-access-token'];
    }
});

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

module.exports = router;