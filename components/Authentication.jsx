var React = require("react");
var ReactDOMServer = require("react-dom/server");
var bootstrap = require("react-bootstrap");

var request = require("superagent");

var Form = bootstrap.Form;
var FormControl = bootstrap.FormControl;
var Button = bootstrap.Button;
var Checkbox = bootstrap.Checkbox;
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
      <Form onSubmit={this.handleSubmit}>
        <FormControl type="text" label="Username" placeholder="Enter username"
          value={this.state.username} onChange={this.handleUsernameChange} />

        <FormControl type="password" label="Password"
          value={this.state.password} onChange={this.handlePasswordChange} />

        <Checkbox>Stay logged in</Checkbox>

        <Row className="show-grid">
          <Col xs={9} md={6}>
            <Button href="register" block>Register</Button>
          </Col>
          <Col xs={9} md={6}>
            <Button bsStyle="primary"
              type="submit" block>Login</Button>
          </Col>
        </Row>
      </Form>
    );
  }
});

module.exports.AuthenticationForm = AuthenticationForm;

module.exports.renderToString = function() {
  return ReactDOMServer.renderToString(<AuthenticationForm />);
};
