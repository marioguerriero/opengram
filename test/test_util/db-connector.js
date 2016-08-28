var config = require('../config_test');

module.exports = function() {
    var mongoose = require('mongoose');
    mongoose.connect(config.dbhost + '/' + config.testdb);
};