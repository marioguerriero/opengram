var express = require("express");
var expressJwt = require("express-jwt");
var jwt = require("jsonwebtoken");
var jwtCookie = require("./../util/express-jwt-cookie-validator");

var browserify = require("browserify");
var literalify = require("literalify");
var reactify = require("reactify");

var renderer = require(__dirname + "/../util/react-renderer");

var HeaderBar = require("../comps/HeaderBar.jsx");
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
      header: HeaderBar.renderToString(),
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
    header: HeaderBar.renderToString(),
    content: RegistrationForm.renderToString()
  }, res);
});

router.get("/login", function(req, res) {
  res.redirect("/");
});

// Users profiles
router.route("/u/:username")
.all(expressJwt({
  secret: config.secret,
  getToken: jwtCookie
}))
.get(function(req, res) {
  var username = req.params.username;
  res.sendStatus(200).end();
});

// Posts
router.route("/p/:id")
.all(expressJwt({
  secret: config.secret,
  getToken: jwtCookie
}))
.get(function(req, res) {
  var id = req.params.id;
});

// Error handling
router.use(function(err, req, res, next) {
  console.log(err.stack);
  res.sendStatus(404);
});

module.exports = router;
