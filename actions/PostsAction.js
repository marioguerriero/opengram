import PostsConstants from '../util/PostsConstants';
import AppDispatcher from './../dispatcher/AppDispatcher';

import request from 'superagent';

export default {
    getPost: function(id) {
        AppDispatcher.dispatch({
            post: post,
            actionType: PostsConstants.POST_LOAD
        });
    },

    createPost: function(post) {
        AppDispatcher.dispatch({
            actionType: PostsConstants.POST_CREATE
        });
    },

    deletePost: function(id) {
        AppDispatcher.dispatch({
            actionType: PostsConstants.POST_DELETE
        });
    },

    updatePost: function(post) {
        AppDispatcher.dispatch({
            actionType: PostsConstants.POST_UPDATE
        });
    },

    getTimeline: function(user) {
        AppDispatcher.dispatch({
            actionType: PostsConstants.TIMELINE_LOAD
        });
    }
};