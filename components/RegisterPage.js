import React from 'react';

import { browserHistory } from 'react-router';

import UserAction from '../actions/UserActions';
import UsersStore from '../stores/UsersStore';

import { RegisterForm } from './Forms';

export default class RegisterPage extends React.Component {
    constructor(props) {
        super(props);
        UsersStore.addListener('login', () => {
            browserHistory.push('/');
        });
        UsersStore.addListener('login', () => {
            browserHistory.push('/login');
        });
    }

    onRegister(req) {
        UserAction.registerUser(req);
    }

    render() {
        return <RegisterForm onSubmit={this.onRegister}/>;
    }
}