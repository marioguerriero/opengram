/** @jsx React.DOM */

var React = require("react");
var ReactDOMServer = require("react-dom/server");
var bootstrap = require("react-bootstrap");

var Input = bootstrap.Input;
var Button = bootstrap.Button;
var ButtonInput = bootstrap.ButtonInput;
var Row = bootstrap.Row;
var Col = bootstrap.Col;

var AuthenticationForm = React.createClass({
  render: function() {
    return(
      <form action="login" method="POST" >
        <Input type="text" label="Username" placeholder="Enter username" />
        <Input type="password" label="Password" />
        <Input type="checkbox" label="Stay logged in" checked readOnly />
        <Row className="show-grid">
          <Col xs={9} md={6}>
            <Button href="register" block="true">Register</Button>
          </Col>
          <Col xs={9} md={6}>
            <ButtonInput bsStyle="primary" block="true" type="submit" value="Login" />
          </Col>
        </Row>
      </form>
    );
  }
});

module.exports = AuthenticationForm;
module.exports.renderToString = function() {
  return ReactDOMServer.renderToString(<AuthenticationForm />);
}
