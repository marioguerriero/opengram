import React from 'react';

import UsersActions from '../actions/UsersActions';

import { LoginForm } from './Forms';

module.exports = React.createClass({
    onLogin: function(credentials) {
        UsersActions.logUserIn(credentials);
    },

    render: function() {
        return <LoginForm onSubmit={this.onLogin} />;
    }
});