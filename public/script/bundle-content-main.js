var React = require("react");
var ReactDOM = require("react-dom");

var AuthenticationForm = React.createElement(
  require("./../../components/AuthenticationForm.js").AuthenticationForm);

ReactDOM.render(AuthenticationForm, document.getElementById("content"));
