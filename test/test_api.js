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

var post = {
    message: 'This is a sample post',
    date: new Date()
};

describe('Test API', function() {
    var url = 'http://localhost:' + config.testport;

    // Test users
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
            .set('x-access-token', token)
            .send(user)
            .end(function(err, res) {
                if(err)
                    throw err;

                var localUser = res.body;
                assert.equal(birthdate, localUser.birthday);
                done();
            });
    });

    // Test Posts
    it('Post creation without publisher', function(done) {
        request(url)
            .post('/api/posts')
            .set('x-access-token', token)
            .send(post)
            .end(function(err, res) {
                if(err)
                    throw err;

                assert.equal(400, res.status);
                done();
            });
    });

    it('Post creation without token', function(done) {
        post.publisher = user._id;

        request(url)
            .post('/api/posts')
            .send(post)
            .end(function(err, res) {
                if(err)
                    throw err;

                assert.equal(401, res.status);
                done();
            });
    });

    it('Post creation', function(done) {
        request(url)
            .post('/api/posts')
            .set('x-access-token', token)
            .send(post)
            .end(function(err, res) {
                if(err)
                    throw err;

                assert.equal(200, res.status);

                post._id = res.body._id;
                assert.isNotNull(post._id);

                done();
            });
    });

    it('Query posts for user', function(done) {
        request(url)
            .get('/api/posts')
            .set('x-access-token', token)
            .send({ publisher: user._id })
            .end(function(err, res) {
                if(err)
                    throw err;

                assert.equal(200, res.status);

                assert.equal(1, res.body.posts.length);

                done();
            });
    });

    it('Edit post', function(done) {
        var newMessage = 'I want to edit this post\'s message';
        post.message = newMessage;

        request(url)
            .put('/api/post/' + post._id)
            .set('x-access-token', token)
            .send(post)
            .end(function(err, res) {
                if(err)
                    throw err;

                assert.equal(200, res.status);

                var localPost = res.body;
                assert.equal(newMessage, localPost.message);

                done();
            });
    });

    after(function() {
        // Delete created post
        request(url)
            .delete('/api/post/' + post._id)
            .set('x-access-token', token)
            .send(post)
            .end(function(err, res) {
                if(err)
                    throw err;

                assert.equal(200, res.status);
                done();
            });
        // Delete created user
        request(url)
            .delete('/api/user/' + user._id)
            .set('x-access-token', token)
            .end(function(err, res) {
                if(err)
                    throw err;

                assert.equal(200, res.status);
                done();
            });
        // Close db connection
        mongoose.connection.close();
        // Close server
        server.close();
    });
});