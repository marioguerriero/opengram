var React = require("react");
var ReactDOM = require("react-dom");

// Header
var HeaderBar = React.createElement(
  require("./../../comps/HeaderBar.jsx").HeaderBar);

ReactDOM.render(HeaderBar, document.getElementById("header"));

// Footer
// ...
