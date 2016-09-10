var React = require('react');
var Link = require('react-router').Link;

var Form = require('grommet').Form;
var FormField = require('grommet').FormField;
var CheckBox = require('grommet').CheckBox;
var Button = require('grommet').Button;
var GLoginForm = require('grommet').LoginForm;
var Heading = require('grommet').Heading;
var Footer = require('grommet').Footer;
var Box = require('grommet').Box;

var RegisterForm = React.createClass({
  render: function() {
    return <Form onSubmit={this.props.onSubmit}>
      <Heading strong={true}>
        Register
      </Heading>

      <fieldset>
        <FormField label='Full name' htmlFor='fn-input'>
          <input id='fn-input' type='text'/>
        </FormField>
        <FormField label='Username' htmlFor='uname-input' >
          <input id='uname-input' type='text'/>
        </FormField>
        <FormField label='Email' htmlFor='email-input' >
          <input id='email-input' type='email'/>
        </FormField>
        <FormField label='Password' htmlFor='pwd-input' >
          <input id='pwd-input' type='password'/>
        </FormField>
        <FormField label='Confirm Password' htmlFor='pwdc-input' >
          <input id='pwdc-input' type='password'/>
        </FormField>
      </fieldset>

      <Footer align='start' size='small' direction='column'
              pad={{vertical: 'medium', between: 'medium'}}>
        <Box direction="row" align="start">
          <CheckBox id='terms-cb' label='I agree with'/>
          <Link to='terms-and-conditions'>terms and conditions</Link>
        </Box>
        <Button label="Register" primary={true} strong={true} onClick={this.props.onSubmit} />
      </Footer>
    </Form>;
  }
});

var LoginForm = React.createClass({
  render: function() {
    return <GLoginForm align='start' title='Opengram Login' onSubmit={this.props.onSubmit} rememberMe={true}
                       forgotPassword={<Link to='/forgot-password'>Forgot password?</Link>} errors={['Invalid username or password.']}
                       defaultValues={{'rememberMe': true}} />
  }
});

module.exports.RegisterForm = RegisterForm;
module.exports.LoginForm = LoginForm;