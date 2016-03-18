var express = require("express");
var expressJwt = require("express-jwt");
var jwt = require("jsonwebtoken");
var jwtCookie = require("./../util/express-jwt-cookie-validator");

var bcrypt = require("bcrypt-nodejs");

var superagent = require("superagent");

var browserify = require("browserify");
var literalify = require("literalify");
var reactify = require("reactify");

var renderer = require(__dirname + "/../util/react-renderer");

var cookieExtractor = require("./../util/cookie-extractor");

var HeaderBar = require("../comps/HeaderBar.jsx");
var AuthenticationForm = require("../comps/Authentication.jsx");
var RegistrationForm = require("../comps/Registration.jsx");
var UserDetails = require("../comps/User.jsx");

var User = require("./../models/user");
var Post = require("./../models/post");

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
        return res.redirect("/login");
      }
      else {
        // Show user's timeline
        var username = decoded.username;
      }
    });
  }
  else {
    return res.redirect("/login");
  }
});

// React DOM Javascript files
var sendBrowserifiedScript = function(res, script) {
  res.setHeader("Content-Type", "text/javascript");
  browserify()
      .add(script)
      .transform(reactify, {global: true})
      .bundle()
      .pipe(res);
};

router.get("/script/bundle-frame.js", function(req, res) {
  sendBrowserifiedScript(res,
    __dirname + "/../view/script/bundle-frame.js");
});
router.get("/script/bundle-content-main.js", function(req, res) {
  sendBrowserifiedScript(res,
    __dirname + "/../view/script/bundle-content-main.js");
});
router.get("/script/bundle-content-timeline.js", function(req, res) {
  sendBrowserifiedScript(res,
    __dirname + "/../view/script/bundle-content-timeline.js");
});
router.get("/script/bundle-content-user.js", function(req, res) {
  sendBrowserifiedScript(res,
    __dirname + "/../view/script/bundle-content-user.js");
});

// Registration form
router.get("/register", function(req, res) {
  return renderer(__dirname + "/../view/template.html", {
    header: HeaderBar.renderToString(),
    content: RegistrationForm.renderToString()
  }, res);
});

// Login
router.get("/login", function(req, res) {
  // Show login view
  return renderer(__dirname + "/../view/index.html", {
    header: HeaderBar.renderToString(),
    content: AuthenticationForm.renderToString()
  }, res);
});
router.post("/login", function(req, res) {
  var status = 200;
  // If the user is trying to login then try it!
  if(req.body.username && req.body.password) {
    User.findOne({username: req.body.username}, function(err, user) {
      if(err || !user) {
        status = 401; // Unauthorized
        console.log(err + " " + user);
      }
      else {
        // Check if password match
        bcrypt.compare(req.body.password, user.password, function(err, result) {
          if(err || !result) {
            status = 401; // Unauthorized
          }
          else {
            // Valid credentials, let's generate a token
            var token = jwt.sign({username:req.body.username}, config.secret, {
              expiresIn: "7d"
            });
            // Send a cookie containing the token back to the client
            res.cookie("token", token);
            // Redirect to timeline
            res.send({redirect: "/timeline"});
            return res.end();
          }
        });
      }
    });
  }
  else {
    return res.redirect(401, "/login");
  }
});

// User's timeline
router.route("/timeline")
.all(expressJwt({
  secret: config.secret,
  getToken: jwtCookie
}))
.get(function(req, res) {
  var token = cookieExtractor(req.headers.cookie, "token");
  var username = jwt.decode(token).username;

  var user = {
    username: username
  };

  return renderer(__dirname + "/../view/timeline.html", {
    header: HeaderBar.renderToString(user)
    }, res);
});

// Users profiles
router.route("/u/:username")
.all(expressJwt({
  secret: config.secret,
  getToken: jwtCookie
}))
.get(function(req, res) {
  var username = req.params.username;

  User.findOne({username: username}, function(err, user) {
    if(err || !user) {
      return res.sendStatus(401); // Unauthorized
    }

    return renderer(__dirname + "/../view/user.html", {
      header: HeaderBar.renderToString(user),
      content: UserDetails.renderToString(user)
      }, res);
  });
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
