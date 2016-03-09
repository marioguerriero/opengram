var express = require("express");
var expressJwt = require("express-jwt");
var jwt = require("jsonwebtoken");

var browserify = require("browserify");
var literalify = require("literalify");
var reactify = require("reactify");

var renderer = require(__dirname + "/../util/react-renderer");

var AuthenticationForm = require("../comps/Authentication.jsx");
var RegistrationForm = require("../comps/Registration.jsx");

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
        return renderer(__dirname + "/../view/index.html", {
          content: AuthenticationForm.renderToString()
        }, res);
      }
      else {
        // Show user's timeline
        var username = decoded.username;
      }
    });
  }
  else {
    // Show login view
    return renderer(__dirname + "/../view/index.html", {
      content: AuthenticationForm.renderToString()
    }, res);
  }
});

// JS files for home page
router.get("/script/bundle-index.js", function(req, res) {
  res.setHeader("Content-Type", "text/javascript");
  browserify()
      .add(__dirname + "/../view/script/bundle-index.js")
      .transform(reactify, {global: true})
      .bundle()
      .pipe(res);
});

// Registration form
router.get("/register", function(req, res) {
  return renderer(__dirname + "/../view/template.html", {
    content: RegistrationForm.renderToString()
  }, res);
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
