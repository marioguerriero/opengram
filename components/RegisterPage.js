import React from 'react';

import UsersAction from './../actions/UsersActions';

import { RegisterForm } from './Forms';

export default class RegisterPage extends React.Component {
    onRegister(req) {
        UsersAction.registerUser(req);
    }

    render() {
        return <RegisterForm onSubmit={this.onRegister}/>;
    }
}