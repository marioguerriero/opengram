var React = require('react');

var Header = require('grommet').Header;
var Title = require('grommet').Title;

var Logo = require('./Logo');

module.exports = React.createClass({
    render: function() {
        return <Header>
            <Title>
                <Logo size='thumb' />
                Opengram
            </Title>
        </Header>;
    }
});