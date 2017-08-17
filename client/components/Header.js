import React from 'react';

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';

import Router  from 'next/router';

import { Navbar, Nav, NavItem, FormGroup, FormControl } from 'react-bootstrap';

import { authDestroy } from '../redux/user_actions';

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.logout = this.logout.bind(this);
  }

  logout() {
    this.props.logout();
  }

  render() {
    let rightButtons = (<Nav pullRight>
      <NavItem eventKey={1} onClick={() => Router.push('/login')}>Login</NavItem>
      <NavItem eventKey={2} onClick={() => Router.push('/register')}>Register</NavItem>
    </Nav>);
    if(this.props.loggedIn) {
      rightButtons = (<Nav pullRight>
        <NavItem eventKey={1} onClick={() => Router.push('/user?id=' + this.props.user._id)}>{this.props.user.username}</NavItem>
        <NavItem eventKey={2} onClick={() => this.logout()}>Logout</NavItem>
      </Nav>);
    }

    return (
      <Navbar fluid collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand onClick={() => Router.push('/')}>
            Opengram
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Form pullRight>
          <FormGroup>
            <FormControl type="text" placeholder="Search" />
          </FormGroup>
        </Navbar.Form>
        <Navbar.Collapse>
          {rightButtons}
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

const mapStateToProps = ({ user, loggedIn }) => ({ user, loggedIn })

const mapDispatchToProps = (dispatch) => {
  return {
    logout: bindActionCreators(authDestroy, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
