var React = require('react');

var Link = require('react-router').Link;

var Header = require('grommet').Header;
var Box = require('grommet').Box;
var Title = require('grommet').Title;
var Menu = require('grommet').Menu;
var Search = require('grommet').Search;
var Anchor = require('grommet').Anchor;
var Button = require('grommet').Button;
var Image = require('grommet').Image;

var UserSettings = require('grommet/components/icons/base/UserSettings');

var Logo = require('./Logo');

module.exports = React.createClass({
    renderUserContent: function() {
        if(this.props.user) {
            return <Box direction='row' justify='between' pad='small'>
                <Search inline={true} className='flex' placeHolder='Search' />
                <Menu direction='row' align='center' responsive={false}>
                    <Anchor href='#'>
                        <Image size='thumb' src={this.props.user.avatar} />
                    </Anchor>
                    <Anchor href='#'>
                        <UserSettings />
                    </Anchor>
                </Menu>
            </Box>
        }
        else {
            return <Menu inline={true} direction='row' >
                <Link to="/register"><Button label='Register' onClick={function(){}}/></Link>
                <Link to="/login"><Button label='Login' primary={true} onClick={function(){}} /></Link>
            </Menu>
        }

    },

    render: function() {
        return <Header justify='between'>
            <Link to='/'>
                <Title>
                    <Logo size='thumb' />
                    Opengram
                </Title>
            </Link>
            {this.renderUserContent()}
        </Header>;
    }
});