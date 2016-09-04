var React = require('react');
var Router = require('react-router').Router;
var browserHistory = require('react-router').browserHistory;

var routes = require('../component_routes');

module.exports = React.createClass({
    render: function() {
        return <Router history={browserHistory} routes={routes} onUpdate={() => window.scrollTo(0, 0)}/>;
    }
});