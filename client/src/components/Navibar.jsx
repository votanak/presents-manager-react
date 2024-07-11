import React from 'react';
import { Link } from 'react-router-dom';
import { Nav, Navbar } from 'react-bootstrap';

import { styled } from 'styled-components';

const NaviBarStyle = styled(Navbar)`
  background-color: #4c4c4f;
  height: 70px;
  .navbar-toggler {
    margin: 3px;
    padding: 3px;
  }
  .nav-link {
    font-size: 18px;
  }
  #img-loc {
    height: 25px;
  }
  #address {
    font-size: 14px;
  }
  #firm-name {
    font-size: clamp(0.3rem, 1.5vw + 0.5rem, 1.3rem);
  }
`;
export const NaviBar = () => {
  return (
    <NaviBarStyle
      collapseOnSelect
      expand="lg"
      variant="light"
      bg="light"
      className="px-4 py-0"
      sticky="top">
      <Navbar.Brand href="/" className="fw-bold">
        <img src="/pic/logo.png" height="50px" alt="logo" className="me-2" />
        <span id="firm-name">
          <span className="text-primary">ГК "Конфи"</span>
          &nbsp;<span className="text-danger">в</span>&nbsp;
          <span className="text-success">г.Липецк</span>
        </span>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="me-auto text-nowrap p-2 fs-6">
          <Nav.Link as={Link} to={'/'}>
            Главная
          </Nav.Link>
          <Nav.Link as={Link} to={'/makegift'}>
            Собрать подарок
          </Nav.Link>
          <Nav.Link as={Link} to={'/kontakty'}>
            Контакты
          </Nav.Link>
        </Nav>
        <Nav className="ms-auto d-none d-xl-block">
          <Nav.Link variant="primary text-wrap" id="address">
            <img src="/pic/lociconb.png" id="img-loc" alt="loc-img" />
            г. Липецк, ул. Первомайская, д. 55, тел. +7 (910) 351-75-70
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </NaviBarStyle>
  );
};
