var express = require("express");
var expressJwt = require("express-jwt");
var jwt = require("jsonwebtoken");
var browserify = require("browserify");
var React = require("react");
var ReactDOMServer = require("react-dom/server");

var AuthenticationForm = require("../comps/Authentication.jsx");

var config = require("./../config");

var router = express.Router();

// Home page
router.get("/", function(req, res) {
  // Show timeline or login form
  var auth = req.headers.authorization;
  if(auth) {
    var token = auth.replace("Bearer ", "");
    jwt.verify(token, config.secret, function(err, decoded) {
      if(err) {
        // Show login view
        var html = AuthenticationForm.renderToString();
      }
      else {
        // Show user's timeline
        var username = decoded.username;
      }
    });
  }
  else {
    // Show login view
    var html = AuthenticationForm.renderToString();
  }
  return res.sendStatus(200);
});

// Users profiles
router.route("/u/:username")
.all(expressJwt({secret:config.secret}))
.get(function(req, res) {
  var username = req.params.username;
});

// Posts
router.route("/p/:id")
.all(expressJwt({secret:config.secret}))
.get(function(req, res) {
  var id = req.params.id;
});

module.exports = router;
