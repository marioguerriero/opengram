var config = require("./config");
var mongoose = require("mongoose");

module.exports.init = function() {
  mongoose.connect("mongodb://localhost/" + config.db);
};
