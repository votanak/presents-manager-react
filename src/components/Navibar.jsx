import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';

export const NaviBar = () => {
  return (
    <>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand>ГК "Конфи" в г.Липецк</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav"></Navbar.Collapse>
        <Nav className="me-auto">
          <Nav.Link>Акции</Nav.Link>
          <Nav.Link>Сотрудничество</Nav.Link>
          <Nav.Link>Безопасность</Nav.Link>
        </Nav>
        <Nav>
          <Nav.Link variant="primary">
            г. Липецк, ул. Первомайская, д. 55
          </Nav.Link>
        </Nav>
      </Navbar>
    </>
  );
};
