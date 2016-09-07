var React = require("react");
var ReactDOM = require("react-dom");

var UserDetails = React.createElement(
  require("./../../components/UserPage.js").AuthenticationForm);

ReactDOM.render(UserDetails, document.getElementById("content"));
