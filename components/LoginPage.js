import React from 'react';

import AuthActions from './../actions/AuthActions';

import { LoginForm } from './Forms';

module.exports = React.createClass({
    onLogin: function(credentials) {
        AuthActions.logUserIn(credentials);
    },

    render: function() {
        return <LoginForm onSubmit={this.onLogin} />;
    }
});