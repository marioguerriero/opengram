import React from 'react';

import Router  from 'next/router';

import { Navbar, Nav, NavItem, FormGroup, FormControl } from 'react-bootstrap';

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        user: null
    };
  }

  render() {
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
          <Nav pullRight>
            <NavItem eventKey={1} onClick={() => Router.push('/login')}>Login</NavItem>
            <NavItem eventKey={2} onClick={() => Router.push('/register')}>Register</NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}
