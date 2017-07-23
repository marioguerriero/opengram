import React from 'react';

import Link  from 'next/link';

import { Navbar, Nav, NavItem } from 'react-bootstrap';

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        user: null
    };
  }

  render() {
    return (
      <Navbar inverse collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            <Link href="#">Opengram</Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>

          </Nav>
          <Nav pullRight>
            <NavItem eventKey={1} href="/login"><Link href="/login">Login</Link></NavItem>
            <NavItem eventKey={2} href="/register"><Link href="/register">Register</Link></NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}
