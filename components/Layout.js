var React = require('react');

module.exports = React.createClass({
    render: function () {
        return <div className='app-container'>
            <header>

            </header>
            <div className='app-content'>
                {this.props.children}
            </div>
            <footer>

            </footer>
        </div>;
    }
});
