var React = require('react');
var ReactDOM = require('react-dom');

var AppRoutes = require('./components/AppRoutes');

require('!style!css!sass!./node_modules/grommet/scss/vanilla/index.scss');

window.onload = function() {
    ReactDOM.render(<AppRoutes/>, document.getElementById('app'));
};