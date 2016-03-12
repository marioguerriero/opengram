var config = require("./config");
var mongoose = require("mongoose");

module.exports.init = function() {
  //var connection_string = 'mongodb://127.0.0.1:27017/' + config.db;
  //if(process.env.OPENSHIFT_MONGODB_DB_URL){
  //  connection_string = process.env.OPENSHIFT_MONGODB_DB_URL + config.db;
  //}
  //else if(process.env.HEROKU) {
    connection_string =  "mongodb://mario:mario@ds011459.mlab.com:11459/social-network";
  //}
  mongoose.connect(connection_string);
};
