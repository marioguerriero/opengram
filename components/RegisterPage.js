import React from 'react';

import { browserHistory } from 'react-router';

import UsersAction from './../actions/UsersActions';
import UsersStore from '../stores/UsersStore';

import { RegisterForm } from './Forms';

export default class RegisterPage extends React.Component {
    constructor(props) {
        super(props);
        UsersStore.addListener('login', () => {
            browserHistory.push('/');
        });
    }

    onRegister(req) {
        UsersAction.registerUser(req);
    }

    render() {
        return <RegisterForm onSubmit={this.onRegister}/>;
    }
}