import UsersConstants from '../util/UsersConstants';
import AppDispatcher from './../dispatcher/AppDispatcher';

import request from 'superagent';

export default {
    logUserIn: function(credentials) {
        request
            .post('/api/login')
            .send(credentials)
            .end(function(err, res) {
                switch(res.statusCode) {
                    case 200:
                        let profile = res.body;
                        let token = profile.token;

                        AppDispatcher.dispatch({
                            actionType: UsersConstants.LOGIN_USER,
                            profile: profile,
                            token: token
                        });
                        break;
                    case 400:
                    case 401:
                        AppDispatcher.dispatch({
                            actionType: UsersConstants.LOGIN_FAILED,
                            errorMessage: 'Invalid username or password'
                        });
                        break;
                }
            });
    },

    logUserOut: function() {
        AppDispatcher.dispatch({
            actionType: UsersConstants.LOGOUT_USER
        });
    },
    
    registerUser: function(profile) {
        request
            .post('/api/users')
            .send(profile)
            .end(function(err) {
                if(err)
                    throw err;

                AppDispatcher.dispatch({
                    actionType: UsersConstants.REGISTER_USER,
                });
            });
    },
    
    updateUser: function(profile, token) {
        
    },
    
    deleteUser: function(credentials, token) {
        
    }
};