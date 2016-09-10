var React = require('react');

var LoginForm = require('./Forms').LoginForm;

module.exports = React.createClass({
    onLogin: function() {

    },

    render: function() {
        return <LoginForm onSubmit={this.onLogin} />;
    }
});