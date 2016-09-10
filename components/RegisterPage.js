var React = require('react');

var RegisterForm = require('./Forms').RegisterForm;

module.exports = React.createClass({
    onRegister: function() {

    },

    render: function() {
        return <RegisterForm onSubmit={this.onRegister}/>;
    }
});