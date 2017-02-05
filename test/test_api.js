/**
 * Test register and login processes along with user profile editing and deleting
 */
import chai from 'chai';

import serverStarter from './test_util/server-starter';
import dbConnector from './test_util/db-connector';

import request from 'supertest';
import mongoose from 'mongoose';
import config from './config_test';

var assert = chai.assert;

// Connect to database
dbConnector();

// Launch server
var server = serverStarter();

var user = {
    name: "Mario Guerriero",
    username: "marioguerriero",
    password: "samplepassword"
};

// This user will be used just to help with timeline testing
var user2 = {
    name: "Winston Smith",
    username: "winstonsmith",
    password: "winstonsmithPass"
};

var token = null;

var token2 = null;

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

    it('Register a second new user user', function(done) {
        request(url)
            .post('/api/users')
            .send(user2)
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

    it('Login first user', function(done) {
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

    it('Login second user', function(done) {
        request(url)
            .post('/api/login')
            .send(user2)
            .end(function(err, res) {
                if(err)
                    throw err;
                assert.equal(200, res.status);

                user2._id = res.body._id;
                assert.isNotNull(user2._id);

                token2 = res.body.token;
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

    it('Second user starts following the first one', function(done) {
        request(url)
            .post('/api/user/follow/' + user._id)
            .set('x-access-token', token2)
            .send(user)
            .end(function(err, res) {
                if(err)
                    throw err;

                assert.equal(200, res.status);

                var localUser = res.body;
                assert.equal(user._id, localUser.following[0]);

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

    // Timeline

    it('Test timeline', function(done) {
      request(url)
          .get('/api/timeline')
          .set('x-access-token', token2)
          .send(post)
          .end(function(err, res) {
              if(err)
                  throw err;

              assert.equal(200, res.status);
              assert.isAbove(res.body.posts.length, 0, 'Timeline contains at least one post')
              done();
          });
    });

    // Delete APIs endpoints

    it('Delete created post', function(done) {
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
    });

    it('Delete created user: ' + user.username, function(done) {
      request(url)
          .delete('/api/user/' + user._id)
          .set('x-access-token', token2)
          .end(function(err, res) {
              if(err)
                  throw err;

              assert.equal(200, res.status);
              done();
          });
    });

    it('Delete created user: ' + user2.username, function(done) {
      request(url)
          .delete('/api/user/' + user2._id)
          .set('x-access-token', token2)
          .end(function(err, res) {
              if(err)
                  throw err;

              assert.equal(200, res.status);
              done();
          });
    });

    after(function() {
        // Close db connection
        mongoose.connection.close();
        // Close server
        server.close();
    });
});
