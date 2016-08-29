var config = require('../config_test');

module.exports = function() {
    var mongoose = require('mongoose');
    if(!mongoose.connection.readyState)
        mongoose.connect(config.dbhost + '/' + config.testdb);
};