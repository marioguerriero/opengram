import AuthConstants from './../util/AuthConstants';
import AppDispatcher from './../dispatcher/AppDispatcher';

import request from 'superagent';

export default {
    logUserIn: function(credentials) {
        request
            .post('/api/login')
            .send(credentials)
            .end(function(err, res) {
                if(err)
                    throw err;

                let profile = res.body;
                let token = profile.token;

                AppDispatcher.dispatch({
                    actionType: AuthConstants.LOGIN_USER,
                    profile: profile,
                    token: token
                });
            });
    },

    logUserOut: function() {
        AppDispatcher.dispatch({
            actionType: AuthConstants.LOGOUT_USER
        });
    }
};