import React from 'react';
import { Link } from 'react-router';

import autobind from 'autobind-decorator';

import { Form, FormField, CheckBox,
    Button, LoginForm as GLoginForm, Heading,
    Footer, Box } from 'grommet';

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

    @autobind
    handleFullnameChange(event) {
        this.setState({fullname: event.target.value});
    }

    @autobind
    handleUsernameChange(event) {
        this.setState({username: event.target.value});
    }

    @autobind
    handleEmailChange(event) {
        this.setState({email: event.target.value});
    }

    @autobind
    handlePasswordChange(event) {
        this.setState({password: event.target.value});
    }

    @autobind
    handleConfirmPasswordChange(event) {
        this.setState({confirmPassword: event.target.value});
    }

    @autobind
    handleTermsAndConditionsChange(event) {
        this.setState({conditionsAgreement: event.target.value});
    }

    @autobind
    onSubmit() {
        this.props.onSubmit(this.state)
    }

    render() {
        return <Form onSubmit={this.props.onSubmit}>
            <Heading strong={true}>
                Register
            </Heading>

            <fieldset>
                <FormField label='Full name' htmlFor='fn-input'>
                    <input id='fn-input' value={this.state.fullname} type='text' onChange={this.handleFullnameChange}/>
                </FormField>
                <FormField label='Username' htmlFor='uname-input' >
                    <input id='uname-input' value={this.state.username} type='text' onChange={this.handleUsernameChange}/>
                </FormField>
                <FormField label='Email' htmlFor='email-input' >
                    <input id='email-input' value={this.state.email} type='email' onChange={this.handleEmailChange}/>
                </FormField>
                <FormField label='Password' htmlFor='pwd-input' >
                    <input id='pwd-input' value={this.state.password} type='password' onChange={this.handlePasswordChange}/>
                </FormField>
                <FormField label='Confirm Password' htmlFor='pwdc-input' >
                    <input id='pwdc-input' value={this.state.confirmPassword} type='password' onChange={this.handleConfirmPasswordChange}/>
                </FormField>
            </fieldset>

            <Footer align='start' size='small' direction='column'
                    pad={{vertical: 'medium', between: 'medium'}}>
                <Box direction="row" align="start">
                    <CheckBox id='terms-cb' checked={this.state.conditionsAgreement} label='I agree with' onChange={this.handleTermsAndConditionsChange}/>
                    <Link to='terms-and-conditions'>terms and conditions</Link>
                </Box>
                <Button label="Register" primary={true} strong={true} onClick={this.onSubmit} />
            </Footer>
        </Form>;
    }
}

class LoginForm extends React.Component{
    render() {
        return <GLoginForm align='start' title='Login' usernameType='text' onSubmit={this.props.onSubmit} rememberMe={true}
                           forgotPassword={<Link to='/forgot-password'>Forgot password?</Link>} errors={['Invalid username or password.']}
                           defaultValues={{'rememberMe': true}} />
    }
}

export { RegisterForm, LoginForm };