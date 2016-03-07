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
      <form action="registration" method="POST" >
        <Row className="show-grid">
          <Col xs={9} md={6}><Input type="text" label="First name" placeholder="First name" /></Col>
          <Col xs={9} md={6}><Input type="text" label="Last name" placeholder="Last name" /></Col>
        </Row>
        <Input type="text" label="Username" placeholder="Username" />
        <Input type="email" label="Email address" placeholder="Email address" />
        <Row className="show-grid">
          <Col xs={9} md={6}><Input type="password" label="Password" /></Col>
          <Col xs={9} md={6}><Input type="password" label="Confirm Password" /></Col>
        </Row>
        <Input type="checkbox" label="I agree with terms and conditions" />

        <ButtonInput bsStyle="primary" type="submit" value="Register" block="true" />
      </form>
    );
  }
});

module.exports = AuthenticationForm;
module.exports.renderToString = function() {
  return ReactDOMServer.renderToString(<AuthenticationForm />);
}
