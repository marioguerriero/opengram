module.exports = function() {
    var mongoose = require('mongoose');
    var dbname = require('./../config_test').testdb;
    mongoose.connect('mongodb://localhost/' + dbname);
};