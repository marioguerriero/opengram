/**
 * Test register and login processes along with user profile editing and deleting
 */
var chai = require('chai');
var assert = chai.assert;
var request = require('supertest');

var mongoose = require('mongoose');

// Connect to database
require('./test_util/db-connector')();
// Launch server
require('./test_util/server-starter')();

describe('UsersTest', function() {
    var url = 'http://localhost:5000';

    before(function(done) {
        // Connect to the test database
        //mongoose.connect('mongodb://localhost/' + config.testdb);
        done();
    });

    it('Test registration and login', function(done) {
        var user = {
            name: "Mario Guerriero",
            username: "marioguerriero",
            password: "samplepassword"
        };
        // Register new user
        request(url)
            .post('/api/register')
            .send(user)
            .end(function(err, res) {
                if(err)
                    throw err;
                assert.equal(200, res.status);
                done();
            });
    });

    after(function() {
        mongoose.connection.close();
    });
});