var config = require('../config_test');

module.exports = function() {
    var mongoose = require('mongoose');
    var dbname = config.testdb;
    mongoose.connect(config.dbhost + '/' + dbname);
};