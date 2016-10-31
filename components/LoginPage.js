import React from 'react';

import { browserHistory } from 'react-router';

import UsersActions from '../actions/UsersActions';
import UsersStore from '../stores/UsersStore';

import { LoginForm } from './Forms';

export default class extends React.Component {
    constructor(props) {
        super(props);
        UsersStore.addListener('change', this.onLogin);
    }

    onLogin() {
        if(UsersStore.getUser()) // If login was successful
            browserHistory.push('/');
    }

    onLoginCb(credentials) {
        UsersActions.logUserIn(credentials);
    }

    componentWillUnmount() {
        UsersStore.removeListener('login', this.onLogin);
    }

    render() {
        return <LoginForm onSubmit={this.onLoginCb} />;
    }
}