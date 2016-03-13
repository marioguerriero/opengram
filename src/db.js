var config = require("./config");
var mongoose = require("mongoose");

module.exports.init = function() {
  var connection_string = process.env.OPENSHIFT_MONGODB_DB_URL || "mongodb://127.0.0.1:27017/" + config.db;
  mongoose.connect(connection_string);
};
