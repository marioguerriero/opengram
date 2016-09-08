var ReactDOM = require('react-dom');

require('!style!css!sass!./node_modules/grommet/scss/vanilla/index.scss');

window.onload = function() {
    ReactDOM.render(<AppRoutes/>, document.getElementById('app'));
};