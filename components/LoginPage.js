import React from 'react';

import { browserHistory } from 'react-router';

import UsersActions from '../actions/UsersActions';

import { LoginForm } from './Forms';

export default class extends React.Component {
    onLogin(credentials) {
        UsersActions.logUserIn(credentials);
        browserHistory.push('/');
    }

    render() {
        return <LoginForm onSubmit={this.onLogin} />;
    }
}