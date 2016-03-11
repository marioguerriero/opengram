var React = require("react");
var ReactDOM = require("react-dom");

// Header
var HeaderBar = React.createElement(
  require("./../../comps/HeaderBar.jsx").HeaderBar);

ReactDOM.render(HeaderBar, document.getElementById("header"));

// Content
var AuthenticationForm = React.createElement(
  require("./../../comps/Authentication.jsx").AuthenticationForm);

ReactDOM.render(AuthenticationForm, document.getElementById("content"));

// Footer
// ...
