import React from 'react';
import Link from 'next/link';

import { FormGroup, ControlLabel, FormControl, HelpBlock,
  Checkbox, Button, Col } from 'react-bootstrap';

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

  handleChange(key, ev) {
    var change = {};
    change[key] = ev.target.value;
    this.setState(change);
  }

  handleConditionsAgreementChange() {
    this.setState({ conditionsAgreement: !this.state.conditionsAgreement });
  }

  handleSubmitClick() {
    this.props.onSubmit({
      name: this.state.fullname,
      username: this.state.username,
      email: this.state.email,
      password: this.state.password
    });
  }

  passwordValidation() {
    const length = this.state.password.length;
    if (length > 10) return 'success';
    else if (length > 5) return 'warning';
    else if (length > 0) return 'error';
  }

  confirmPasswordValidation() {

  }

  emailValidation() {

  }

  render() {
    return (
      <form>
        <FormGroup
          controlId="fullname" >
          <ControlLabel>Fullname</ControlLabel>
          <FormControl
            type="text"
            value={this.state.fullname}
            placeholder="Fullname"
            onChange={this.handleChange}
          />
        </FormGroup>

        <FormGroup
          controlId="username" >
          <ControlLabel>Username</ControlLabel>
          <FormControl
            type="text"
            value={this.state.username}
            placeholder="Username"
            onChange={this.handleChange}
          />
        </FormGroup>

        <FormGroup
          controlId="email"
          validationState={this.emailValidation()} >
          <ControlLabel>Email</ControlLabel>
          <FormControl
            type="email"
            value={this.state.email}
            placeholder="Email"
            onChange={this.handleChange}
          />
          <FormControl.Feedback />
        </FormGroup>

        <FormGroup
          controlId="password"
          validationState={this.passwordValidation()} >
          <ControlLabel>Password</ControlLabel>
          <FormControl
            type="password"
            value={this.state.password}
            placeholder="Password"
            onChange={this.handleChange}
          />
          <FormControl.Feedback />
          <HelpBlock>Password must be long at least 6 characters and it must contains at least one character and one number.</HelpBlock>
        </FormGroup>

        <FormGroup
          controlId="confirmPassword"
          validationState={this.confirmPasswordValidation()} >
          <ControlLabel>Confirm Password</ControlLabel>
          <FormControl
            type="password"
            value={this.state.confirmPassword}
            placeholder="Password"
            onChange={this.handleChange}
          />
          <FormControl.Feedback />
        </FormGroup>

        <Checkbox>
          I agree with <Link target="_blank" href="/license">terms and conditions</Link>
        </Checkbox>

        <Button type="submit">
          Register
        </Button>

        <Button type="reset">
          Reset
        </Button>

      </form>
    );
  }
}

class LoginForm extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      username: null,
      password: null
    };
  }

  handleChange(key, ev) {
    var change = {};
    change[key] = ev.target.value;
    this.setState(change);
  }

  onLoginFailed(err) {
    this.setState({ errorMessage: err });
  }

  render() {
    return (
      <form>
        <FormGroup
          controlId="username" >
          <ControlLabel>Username</ControlLabel>
          <FormControl
            type="text"
            value={this.state.username}
            placeholder="Username"
            onChange={this.handleChange}
          />
        </FormGroup>

        <FormGroup
          controlId="password" >
          <ControlLabel>Password</ControlLabel>
          <FormControl
            type="password"
            value={this.state.password}
            placeholder="Password"
            onChange={this.handleChange}
          />
        </FormGroup>

        <FormGroup>
          <Checkbox>Remember me</Checkbox>
        </FormGroup>

        <FormGroup>
          <Link href="/forgot-password">Forgot Password</Link>
        </FormGroup>

        <Button type="submit">
          Login
        </Button>

      </form>
    );
  }
}

export { RegisterForm, LoginForm };
