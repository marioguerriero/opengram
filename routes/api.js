var express = require("express");
var bodyParser = require("body-parser");
var bcrypt = require("bcrypt-nodejs");
var jwt = require("jsonwebtoken");

var config = require("./../config");

var User = require("./../models/user");
var Post = require("./../models/post");

var api = express.Router();

api.use(bodyParser.urlencoded({extended:false}));
api.use(bodyParser.json());

api.use(require('./api_user'));
api.use(require('./api_post'));

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
            user.token = jwt.sign({username: req.body.username}, config.secret, {
                expiresIn: "7d"
            });
            res.send(user).end();
        });
    });
});

module.exports = api;