var React = require("react");
var ReactDOMServer = require("react-dom/server");
var bootstrap = require("react-bootstrap");

var FormControl = bootstrap.FormControl;
var Input = bootstrap.Input;
var Button = bootstrap.Button;
var Checkbox = bootstrap.Checkbox;
var Row = bootstrap.Row;
var Col = bootstrap.Col;

var AuthenticationForm = React.createClass({
  getInitialState: function() {
    return {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      passwordConfirm: ""
    };
  },

  usernameValidation: function() {

  },

  emailValidation: function() {
    // TODO
    if(true) return "success";
    else return "error";
  },

  passwordValidation: function() {

  },

  passwordMatchValidation: function() {

  },

  handleFirstnameChange: function(e) {
    this.setState({firstname:e.target.value});
  },

  handleLastnameChange: function(e) {
    this.setState({lastname:e.target.value});
  },

  handleEmailChange: function(e) {
    this.setState({email:e.target.value});
  },

  handleUsernameChange: function(e) {
    this.setState({username:e.target.value});
  },

  handlePasswordChange: function(e) {
    this.setState({password:e.target.value});
  },

  handlePasswordConfirmChange: function(e) {
    this.setState({passwordConfirm:e.target.value});
  },

  render: function() {
    return(
      <form action="registration" method="POST" >
        <Row className="show-grid">
          <Col xs={9} md={6}>
            <FormControl type="text" label="First name" placeholder="First name"
            value={this.state.firstname} onChange={this.handleFirstnameChange} />
          </Col>

          <Col xs={9} md={6}>
            <FormControl type="text" label="Last name" placeholder="Last name"
              value={this.state.lastname} onChange={this.handleLastnameChange}/>
          </Col>
        </Row>

        <FormControl type="text" label="Username" placeholder="Username"
          bsStyle={this.usernameValidation()}
          value={this.state.username} onChange={this.handleUsernameChange}/>

        <FormControl type="email" label="Email address" placeholder="Email address"
          bsStyle={this.emailValidation()}
          value={this.state.email} onChange={this.handleEmailChange} />

        <Row className="show-grid">
          <Col xs={9} md={6}>
            <FormControl type="password" bsStyle={this.passwordValidation()}
              value={this.state.password} onChange={this.handlePasswordChange}
              label="Password" />
          </Col>

          <Col xs={9} md={6}>
            <FormControl type="password" bsStyle={this.passwordMatchValidation()}
              value={this.state.passwordConfirm} onChange={this.handlePasswordConfirmChange}
              label="Confirm Password" />
          </Col>
        </Row>

        <Checkbox>I agree with terms and conditions</Checkbox>

        <Button bsStyle="primary" type="submit" block>Register</Button>
      </form>
    );
  }
});

module.exports = AuthenticationForm;
module.exports.renderToString = function() {
  return ReactDOMServer.renderToString(<AuthenticationForm />);
};
