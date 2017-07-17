import React from 'react';
import { Link } from 'react-router';

import autobind from 'autobind-decorator';

import { Form, FormField, CheckBox,
    Button, LoginForm as GLoginForm, Heading,
    Footer, Box } from 'grommet';

import UsersStore from './../stores/UsersStore';

class RegisterForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fullname: '',
            username: '',
            email: '',
            password: '',
            confirmPassword: '',
            conditionsAgreement: false
        };
    }

    handleStateChange(key, ev) {
        var change = {};
        change[key] = ev.target.value;
        this.setState(change);
    }

    @autobind
    handleConditionsAgreementChange() {
        this.setState({ conditionsAgreement: !this.state.conditionsAgreement });
    }

    @autobind
    handleSubmitClick() {
        this.props.onSubmit({
            name: this.state.fullname,
            username: this.state.username,
            email: this.state.email,
            password: this.state.password
        });
    }

    render() {
        return <Form onSubmit={this.props.onSubmit}>
            <Heading strong={true}>
                Register
            </Heading>

            <fieldset>
                <FormField label='Full name' htmlFor='fn-input'>
                    <input id='fn-input' value={this.state.fullname} type='text' onChange={this.handleStateChange.bind(this, 'fullname')}/>
                </FormField>
                <FormField label='Username' htmlFor='uname-input' >
                    <input id='uname-input' value={this.state.username} type='text' onChange={this.handleStateChange.bind(this, 'username')}/>
                </FormField>
                <FormField label='Email' htmlFor='email-input' >
                    <input id='email-input' value={this.state.email} type='email' onChange={this.handleStateChange.bind(this, 'email')}/>
                </FormField>
                <FormField label='Password' htmlFor='pwd-input' >
                    <input id='pwd-input' value={this.state.password} type='password' onChange={this.handleStateChange.bind(this, 'password')}/>
                </FormField>
                <FormField label='Confirm Password' htmlFor='pwdc-input' >
                    <input id='pwdc-input' value={this.state.confirmPassword} type='password' onChange={this.handleStateChange.bind(this, 'confirmPassword')}/>
                </FormField>
            </fieldset>

            <Footer align='start' size='small' direction='column'
                    pad={{vertical: 'medium', between: 'medium'}}>
                <Box direction="row" align="start">
                    <CheckBox id='terms-cb' checked={this.state.conditionsAgreement} label='I agree with' onChange={this.handleConditionsAgreementChange}/>
                    <Link to='terms-and-conditions'>terms and conditions</Link>
                </Box>
                <Button label="Register" primary={true} strong={true} disabled={!this.state.fullname ||
                        !this.state.username || !this.state.email || !this.state.password ||
                        !this.state.confirmPassword || !this.state.conditionsAgreement} onClick={this.handleSubmitClick} />
            </Footer>
        </Form>;
    }
}

class LoginForm extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            errorMessage: null
        };
        UsersStore.addListener('login-failed', this.onLoginFailed);
    }

    @autobind
    onLoginFailed(err) {
        this.setState({ errorMessage: err });
    }

    componentWillUnmount() {
        UsersStore.removeListener('login-failed', this.onLoginFailed);
    }

    render() {
        return <GLoginForm align='start' title='Login' usernameType='text' onSubmit={this.props.onSubmit} rememberMe={true}
                           forgotPassword={<Link to='/forgot-password'>Forgot password?</Link>} errors={[this.state.errorMessage]}
                           defaultValues={{'rememberMe': true}} />
    }
}

export { RegisterForm, LoginForm };