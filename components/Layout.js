var React = require('react');

var App = require('grommet').App;
var Button = require('grommet').Button;

var Header = require('./Header');
var Footer = require('./Footer');

module.exports = React.createClass({
    render: function () {
        return <App>
            <Header>

            </Header>
            <div className='app-content'>
                {this.props.children}
            </div>
            <Footer>

            </Footer>
        </App>;
    }
});
