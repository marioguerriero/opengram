import React from 'react';

import { browserHistory } from 'react-router';

import UsersActions from '../actions/UsersActions';
import UsersStore from '../stores/UsersStore';

import { LoginForm } from './Forms';

export default class extends React.Component {
    constructor(props) {
        super(props);
        UsersStore.addListener('login', () => {
            browserHistory.push('/');
        });
    }

    onLogin(credentials) {
        UsersActions.logUserIn(credentials);
    }

    render() {
        return <LoginForm onSubmit={this.onLogin} />;
    }
}