var express = require("express");
var bodyParser = require("body-parser");
var morgan = require("morgan");

var db = require("./db");
db.init();

var app = express();

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(express.static("fs"));

app.use(morgan("dev"));

app.use(require("./router/api"));
app.use(require("./router/upload"));
app.use(require("./router/view"));

// Put the server on listening status
app.listen(8081, function() {
  console.log("Server listening on port " + this.address().port);
});

module.exports = app;
