/** @jsx React.DOM */

var React = require("react");
var ReactDOMServer = require("react-dom/server")

var AuthenticationForm = React.createClass({
  render: function() {
    return(
      <form action={this.props.url} method="POST">
        <input name="username" type="text" />
        <input name="password" type="password" />
        <input type="submit" value="Login" />
      </form>
    );
  }
});

module.exports.renderToString = function() {
  return ReactDOMServer.renderToString(<AuthenticationForm />);
}
