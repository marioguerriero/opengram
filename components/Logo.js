var React = require('react');

var Image = require('grommet').Image;

module.exports = React.createClass({
    render: function() {
        return <Image src='/assets/logo.png' size={this.props.size} />;
    }
});