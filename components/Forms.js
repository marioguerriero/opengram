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
                    <input id='fn-input' value={this.state.fullname} type='text'/>
                </FormField>
                <FormField label='Username' htmlFor='uname-input' >
                    <input id='uname-input' value={this.state.username} type='text'/>
                </FormField>
                <FormField label='Email' htmlFor='email-input' >
                    <input id='email-input' value={this.state.email} type='email'/>
                </FormField>
                <FormField label='Password' htmlFor='pwd-input' >
                    <input id='pwd-input' value={this.state.password} type='password'/>
                </FormField>
                <FormField label='Confirm Password' htmlFor='pwdc-input' >
                    <input id='pwdc-input' value={this.state.confirmPassword} type='password'/>
                </FormField>
            </fieldset>

            <Footer align='start' size='small' direction='column'
                    pad={{vertical: 'medium', between: 'medium'}}>
                <Box direction="row" align="start">
                    <CheckBox id='terms-cb' checked={this.state.conditionsAgreement} label='I agree with'/>
                    <Link to='terms-and-conditions'>terms and conditions</Link>
                </Box>
                <Button label="Register" primary={true} strong={true} onClick={this.onSubmit} />
            </Footer>
        </Form>;
    }
}

class LoginForm extends React.Component{
    render() {
        return <GLoginForm align='start' title='Login' onSubmit={this.props.onSubmit} rememberMe={true}
                           forgotPassword={<Link to='/forgot-password'>Forgot password?</Link>} errors={['Invalid username or password.']}
                           defaultValues={{'rememberMe': true}} />
    }
}

export { RegisterForm, LoginForm };