/** @jsx React.DOM */

var React = require("react");
var ReactDOMServer = require("react-dom/server");
var bootstrap = require("react-bootstrap");

var request = require("superagent");

var Input = bootstrap.Input;
var Button = bootstrap.Button;
var ButtonInput = bootstrap.ButtonInput;
var Row = bootstrap.Row;
var Col = bootstrap.Col;

var AuthenticationForm = React.createClass({
  getInitialState: function() {
    return {
      username: "",
      password: ""
    };
  },

  handleUsernameChange: function(e) {
    this.setState({username:e.target.value});
  },

  handlePasswordChange: function(e) {
    this.setState({password:e.target.value});
  },

  handleSubmit: function(e) {
    e.preventDefault();

    var user = {
      username: this.state.username.trim(),
      password: this.state.password
    }

    request
      .post('/login')
      .send(user)
      .set('Accept', 'application/json')
      .end(function(err, res) {
        window.location = res.body.redirect;
      }); // Server will do the rest
  },

  render: function() {
    return(
      <form onSubmit={this.handleSubmit}>
        <Input type="text" label="Username" placeholder="Enter username"
          value={this.state.username} onChange={this.handleUsernameChange} />

        <Input type="password" label="Password"
          value={this.state.password} onChange={this.handlePasswordChange} />

        <Input type="checkbox" label="Stay logged in" checked readOnly />

        <Row className="show-grid">
          <Col xs={9} md={6}>
            <Button href="register" block>Register</Button>
          </Col>
          <Col xs={9} md={6}>
            <ButtonInput bsStyle="primary"
              type="submit" block value="Login" />
          </Col>
        </Row>
      </form>
    );
  }
});

module.exports.AuthenticationForm = AuthenticationForm;

module.exports.renderToString = function() {
  return ReactDOMServer.renderToString(<AuthenticationForm />);
}
