/** @jsx React.DOM */

var React = require("react");
var ReactDOMServer = require("react-dom/server");
var bootstrap = require("react-bootstrap");

var request = require("superagent");

var Nav = bootstrap.Nav;
var Navbar = bootstrap.Navbar;
var NavItem = bootstrap.NavItem;
var NavDropdown = bootstrap.NavDropdown;
var MenuItem = bootstrap.MenuItem;
var Input = bootstrap.Input;
var Button = bootstrap.Button;
var Image = bootstrap.Image;

var HeaderBarUserButton = React.createClass({
  render: function() {
    if(this.props.user) {
      return (
        <Nav pullRight>
          <NavItem href={"/u/" + this.props.user.username}>
            <Image src="/assets/user-thumb.png" responsive circle />
          </NavItem>
        </Nav>
      );
    }
    else {
      return(
        <Nav pullRight>
          <NavItem href="register">Register</NavItem>
          <NavItem href="login">Login</NavItem>
        </Nav>
      );
    }
  }
});

var HeaderBar = React.createClass({
  getInitialState: function() {
    return {
      user: null
    }
  },

  render: function() {
    return(
      <Navbar inverse staticTop={true}>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="/">Social</a>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            <Navbar.Form pullLeft>
              <Input type="text" placeholder="Search"/>
              <Button type="submit">Submit</Button>
            </Navbar.Form>
          </Nav>

          <HeaderBarUserButton user={this.props.user} />
        </Navbar.Collapse>
      </Navbar>
    );
  }
});

module.exports.HeaderBar = HeaderBar;

module.exports.renderToString = function(user) {
  return ReactDOMServer.renderToString(<HeaderBar user={user} />);
}
