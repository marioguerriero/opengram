import express from "express";
import bodyParser from "body-parser";
import bcrypt from "bcrypt-nodejs";
import jwt from "jsonwebtoken";
import config from "./../config";
import User from "./../models/user";

import api_user from './api_user';
import api_post from './api_post';
import api_timeline from './api_timeline';

var api = express.Router();

api.use(bodyParser.urlencoded({extended:false}));
api.use(bodyParser.json());

api.use(api_user);
api.use(api_post);
api.use(api_timeline);

// Authentication end point
api.post("/login", function(req, res) {
    if(!req.body.username || !req.body.password) {
        return res.sendStatus(400); // Bad Request
    }

    User.findOne({username: req.body.username}, function(err, user) {
        if(err || !user) {
            return res.sendStatus(404); // Unauthorized
        }

        // Check if password match
        bcrypt.compare(req.body.password, user.password, function(err, result) {
            if(err || !result) {
                return res.sendStatus(404); // Unauthorized
            }

            // Valid credentials, let's generate a token
            user = user.toObject();
            user.token = jwt.sign({username: req.body.username}, config.secret, {
                expiresIn: "7d"
            });
            res.send(user).end();
        });
    });
});

export default api;
