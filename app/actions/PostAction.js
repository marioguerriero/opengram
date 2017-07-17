import PostsConstants from '../util/PostsConstants';
import AppDispatcher from './../dispatcher/AppDispatcher';

import request from 'superagent';

export default {
    /**
     * Query a single post with a given id
     * @param id
     * @param token
     */
    getPost: function(id, token) {
        request(url)
            .get('/api/post/' + id)
            .set('x-access-token', token)
            .end(function(err, res) {
                if(err)
                    throw err;

                switch(res.statusCode) {
                    case 200:
                        let post = res.body;

                        AppDispatcher.dispatch({
                            post: post,
                            actionType: PostsConstants.POST_LOAD
                        });
                        break;
                    case 401:
                        AppDispatcher.dispatch({
                            actionType: PostsConstants.NOT_AUTHORIZED,
                            errorMessage: 'Invalid username or password'
                        });
                        break;
                }
            });
    },

    /**
     * Requests all the posts written by the given user
     * @param user
     * @param token
     */
    getPostsForUser: function(user, token) {
        request(url)
            .get('/api/posts')
            .set('x-access-token', token)
            .send({ publisher: user._id })
            .end(function(err, res) {
                if(err)
                    throw err;

                switch(res.statusCode) {
                    case 200:
                        let posts = res.body.posts;

                        AppDispatcher.dispatch({
                            posts: posts,
                            actionType: PostsConstants.MULTIPLE_POST_LOAD
                        });
                        break;
                    case 401:
                        AppDispatcher.dispatch({
                            actionType: PostsConstants.NOT_AUTHORIZED,
                            errorMessage: 'Invalid username or password'
                        });
                        break;
                }
            });
    },

    /**
     * Send a POST request to posts endpoint in order
     * to perform an insertion in the posts database
     * @param post
     * @param token
     */
    createPost: function(post, token) {
        request(url)
            .post('/api/posts')
            .set('x-access-token', token)
            .send(post)
            .end(function(err, res) {
                if(err)
                    throw err;

                switch(res.statusCode) {
                    case 200:
                        let post = res.body;

                        AppDispatcher.dispatch({
                            post: post,
                            actionType: PostsConstants.POST_CREATE
                        });
                        break;
                    case 401:
                        AppDispatcher.dispatch({
                            actionType: PostsConstants.NOT_AUTHORIZED,
                            errorMessage: 'Invalid username or password'
                        });
                        break;
                }
            });
    },

    /**
     * Delete a post from the posts database
     * @param id
     * @param token
     */
    deletePost: function(id, token) {
        request(url)
            .delete('/api/post/' + id)
            .set('x-access-token', token)
            .send(post)
            .end(function(err, res) {
                if(err)
                    throw err;

                switch(res.statusCode) {
                    case 200:
                        AppDispatcher.dispatch({
                            id: id,
                            actionType: PostsConstants.POST_DELETE
                        });
                        break;
                    case 401:
                        AppDispatcher.dispatch({
                            actionType: PostsConstants.NOT_AUTHORIZED,
                            errorMessage: 'Invalid username or password'
                        });
                        break;
                }
            });
    },

    /**
     * Replace a post old content with the passed one. The post
     * updated is the one with the id equal to post._id
     * @param post
     * @param token
     */
    updatePost: function(post, token) {
        request(url)
            .put('/api/post/' + post._id)
            .set('x-access-token', token)
            .send(post)
            .end(function(err, res) {
                if(err)
                    throw err;

                switch(res.statusCode) {
                    case 200:
                        let post = res.body;

                        AppDispatcher.dispatch({
                            post: post,
                            actionType: PostsConstants.POST_UPDATE
                        });
                        break;
                    case 401:
                        AppDispatcher.dispatch({
                            actionType: PostsConstants.NOT_AUTHORIZED,
                            errorMessage: 'Invalid username or password'
                        });
                        break;
                }
            });
    },

    /**
     * Query timeline endpoint to get a list of posts which will
     * be displayed to the user
     * @param user
     * @param token
     */
    getTimeline: function(user, token) {
        AppDispatcher.dispatch({
            actionType: PostsConstants.TIMELINE_LOAD
        });
    }
};