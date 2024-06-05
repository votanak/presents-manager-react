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
  .navbar-toggler {
    margin: 3px;
    padding: 3px;
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
      <Navbar.Collapse id="responsive-navbar-nav p-2">
        <Nav className="me-auto">
          <Nav.Link href="/homepage">Акции</Nav.Link>
          <Nav.Link>Сотрудничество</Nav.Link>
          <Nav.Link>Безопасность</Nav.Link>
        </Nav>
        <Nav className="ms-auto">
          <Nav.Link variant="primary text-wrap">
            <img src={imgloc} id="img-loc" alt="loc-img" />
            г. Липецк, ул. Первомайская, д. 55
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </NaviBarStyle>
  );
};
