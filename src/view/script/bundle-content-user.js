var React = require("react");
var ReactDOM = require("react-dom");

var UserDetails = React.createElement(
  require("./../../comps/User.jsx").AuthenticationForm);

ReactDOM.render(UserDetails, document.getElementById("content"));
