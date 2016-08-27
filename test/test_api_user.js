/**
 * Test register and login processes along with user profile editing and deleting
 */
var chai = require('chai');
var assert = chai.assert;
var request = require('supertest');

var mongoose = require('mongoose');

var config = require('./config_test');

// Connect to database
require('./test_util/db-connector')();

// Launch server
var server = require('./test_util/server-starter')();

var user = {
    name: "Mario Guerriero",
    username: "marioguerriero",
    password: "samplepassword"
};

var token = null;

describe('UsersTest', function() {
    var url = 'http://localhost:' + config.testport;

    it('Register a new user', function(done) {
        request(url)
            .post('/api/users')
            .send(user)
            .end(function(err, res) {
                if(err)
                    throw err;
                assert.equal(200, res.status);
                done();
            });
    });

    it('Register an user with an already existing username', function(done) {
        request(url)
            .post('/api/users')
            .send(user)
            .end(function(err, res) {
                if(err)
                    throw err;
                assert.equal(409, res.status); // Status code should be: 409 CONFLICT
                done();
            });
    });

    it('Login', function(done) {
        request(url)
            .post('/api/login')
            .send(user)
            .end(function(err, res) {
                if(err)
                    throw err;
                assert.equal(200, res.status);

                user._id = res.body._id;
                assert.isNotNull(user._id);

                token = res.body.token;
                assert.isNotNull(token);

                done();
            });
    });

    it('Edit user details', function(done) {
        var birthdate = new Date().toISOString();
        user.birthday = birthdate;

        request(url)
            .put('/api/user/' + user._id)
            .send(user)
            .end(function(err, res) {
                if(err)
                    throw err;

                var localUser = res.body;
                assert.equal(birthdate, localUser.birthday);
                done();
            });
    });

    it('Delete user', function(done) {
        request(url)
            .delete('/api/user/' + user._id)
            .end(function(err, res) {
                if(err)
                    throw err;

                assert.equal(200, res.status);
                done();
            });
    });

    after(function() {
        mongoose.connection.close();
        server.close();
    });
});