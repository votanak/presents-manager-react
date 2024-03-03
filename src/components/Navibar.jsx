import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import { styled } from 'styled-components';
import imgloc from '../img/lociconw.png';

const NaviBarStyle = styled(Navbar)`
  background-color: #4c4c4f;
  .navbar-brand {
    font-size: 16px;
  }
  #img-loc {
    max-height: 25px;
  }
  .navbar-nav {
    align-items: center;
    font-size: 14px;
  }
`;
export const NaviBar = () => {
  return (
    <NaviBarStyle
      collapseOnSelect
      expand="lg"
      variant="dark"
      className="px-4 py-0"
    >
      <Navbar.Brand>ГК "Конфи" в г.Липецк</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link>Акции</Nav.Link>
          <Nav.Link>Сотрудничество</Nav.Link>
          <Nav.Link>Безопасность</Nav.Link>
        </Nav>
      </Navbar.Collapse>
      <Nav className="me-auto">
        <img src={imgloc} id="img-loc" alt="loc-img" />
        <Nav.Link variant="primary">
          г. Липецк, ул. Первомайская, д. 55
        </Nav.Link>
      </Nav>
    </NaviBarStyle>
  );
};
