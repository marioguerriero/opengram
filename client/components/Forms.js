import React from 'react';
import Link from 'next/link';
import Router  from 'next/router';

import fetch from 'isomorphic-fetch';

import { FormGroup, ControlLabel, FormControl, HelpBlock,
  Checkbox, Button, Col } from 'react-bootstrap';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { authRequest } from '../redux/user_actions';

import { cleanErr } from '../redux/store';

class RegisterForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      conditionsAgreement: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleConditionsAgreementChange() {
    this.setState({ conditionsAgreement: !this.state.conditionsAgreement });
  }

  handleSubmitClick() {
    this.props.onSubmit({
      name: this.state.name,
      username: this.state.username,
      email: this.state.email,
      password: this.state.password,
      confirmPassword: this.state.confirmPassword
    });
  }

  passwordValidation() {
    if(!this.state.password) return null;
    let password = this.state.password;
    let re = (/^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{6,}$/);
    if (re.test(password)) return 'success';
    else return 'error';
  }

  confirmPasswordValidation() {
    if(!this.state.confirmPassword || this.passwordValidation() != 'success') return null;
    if (this.state.confirmPassword === this.state.password) return 'success';
    else return 'error';
  }

  emailValidation() {
    if(!this.state.email) return null;
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(re.test(this.state.email)) return "success";
    return "error";
  }

  handleSubmit(event) {
    fetch('//localhost:3000/api/users', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(this.state)
    }).then((response) => {
      if(response.status >= 400) {
        // TODO: redirect to an error page
      }
    });
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <FormGroup
          controlId="name" >
          <ControlLabel>Fullname</ControlLabel>
          <FormControl
            type="text"
            name="name"
            required
            value={this.state.name}
            placeholder="Fullname"
            onChange={this.handleChange}
          />
        </FormGroup>

        <FormGroup
          controlId="username" >
          <ControlLabel>Username</ControlLabel>
          <FormControl
            type="text"
            name="username"
            required
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
            name="email"
            required
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
            name="password"
            required
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
            name="confirmPassword"
            required
            value={this.state.confirmPassword}
            placeholder="Password"
            onChange={this.handleChange}
          />
          <FormControl.Feedback />
          <HelpBlock>This field must match with the above one.</HelpBlock>
        </FormGroup>

        <Checkbox required name="conditionsAgreement" checked={this.state.conditionsAgreement} onChange={this.handleChange}>
          I agree with <Link target="_blank" href="/license"><a>terms and conditions</a></Link>
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

    // Do not display log in page if the user is already logged in
    if(this.props.loggedIn) {
      Router.push('/');
    }

    this.state = {
      username: '',
      password: '',
      remember: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidUpdate() {
    if(this.props.loggedIn) {
      Router.push('/');
    }
    else if(this.props.err) {
      if(this.props.err.status == 401)
        Router.push('/login?err=Invalid username of password');
    }
  }

  componentWillUnmount() {
    this.props.cleanErr();
  }

  handleChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    let user = {
      username: this.state.username,
      password: this.state.password
    };
    this.props.login(user);
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <FormGroup
          controlId="username" >
          <ControlLabel>Username</ControlLabel>
          <FormControl
            type="text"
            name="username"
            required
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
            name="password"
            required
            value={this.state.password}
            placeholder="Password"
            onChange={this.handleChange}
          />
        </FormGroup>

        <FormGroup>
          <Checkbox name="remember" value={this.state.remember} onChange={this.handleChange}>
            Remember me
          </Checkbox>
        </FormGroup>

        <FormGroup>
          <Link href="/forgot-password"><a>Forgot Password</a></Link>
        </FormGroup>

        <Button type="submit">
          Login
        </Button>

      </form>
    );
  }
}

export { RegisterForm };

const mapStateToProps = ({ loggedIn, err }) => ({ loggedIn, err })

const mapDispatchToProps = (dispatch) => {
  return {
    login: bindActionCreators(authRequest, dispatch),
    cleanErr: bindActionCreators(cleanErr, dispatch)
  };
}

const comp = connect(mapStateToProps, mapDispatchToProps)(LoginForm);
export { comp as LoginForm };
