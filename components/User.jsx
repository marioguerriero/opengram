var React = require("react");
var ReactDOMServer = require("react-dom/server");
var bootstrap = require("react-bootstrap");

var Image = bootstrap.Image;
var Row = bootstrap.Row;
var Col = bootstrap.Col;

var UserDetails = React.createClass({
  render: function() {
    return(
      <Row>
        <Col md={6} mdPull={6}>
          <Image src="/assets/user-thumb.png" responsive circle />
        </Col>

        <Col md={6} mdPush={6}>
      {/*<h1>{this.props.user.name}</h1>
          {this.props.user.username}
          <a href={"mailto:"+this.props.user.email}/>
        */}
        <h1>aa</h1>
        </Col>
      </Row>
    );
  }
});

module.exports = UserDetails;
module.exports.renderToString = function(user) {
  return ReactDOMServer.renderToString(<UserDetails user={user} />);
}
