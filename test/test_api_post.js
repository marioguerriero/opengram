/**
 * Test posts API
 */
var chai = require('chai');
var assert = chai.assert;
var request = require('supertest');

var mongoose = require('mongoose');

// Connect to database
require('./test_util/db-connector')();
// Launch server
require('./test_util/server-starter')();

var user = {
    name: "Mario Guerriero",
    username: "marioguerriero",
    password: "samplepassword"
};

describe('UsersTest', function() {
    var url = 'http://localhost:5000';

    after(function() {
        mongoose.connection.close();
        server.close();
    });
});