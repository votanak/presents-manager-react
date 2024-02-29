import styled from 'styled-components';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { NaviBar } from '../components/Navibar';
import logo from '../img/logo.png';
import phoneiconb from '../img/phoneiconb.png';
import { useNavigate } from 'react-router-dom';

const HomeStyle = styled.div`
  font-family: 'Montserrat';
  .col.row {
    text-align: center;
    border: none;
  }

  a {
    text-decoration: none;
  }

  .sp-default-logo {
    height: auto;
    max-height: 75px;
  }
  .phoneicon {
    height: auto;
    max-height: 15px;
  }
  #sp-callback {
    flex-direction: column;
  }
`;

export const HomePage = () => {
  const toLoginPage = useNavigate('/login');
  return (
    <HomeStyle>
      <NaviBar />
      <header id="sp-header" className="animated menu-fixed-out w-100">
        <Container className="mw-100">
          <Row className="align-items-center w-100">
            <Col id="sp-logo" className="col-sm-1">
              <div className="sp-column ">
                <div className="logo">
                  <a href="/">
                    <img
                      className="sp-default-logo"
                      src={logo}
                      alt="ГК «Конфи» - Изготовление и продажа детских новогодних подарков в г. Липецк"
                    />
                  </a>
                </div>
              </div>
            </Col>
            <Col id="sp-slogan" className="col-md-4 text-start">
              <div className="sp-column ">
                <p className="slogan">
                  Изготовление и продажа детских новогодних подарков
                </p>
              </div>
            </Col>
            <Col id="sp-callback" className="col-md-3 ms-auto">
              <p className="phoneic">
                <img className="phoneicon" src={phoneiconb} alt="" />
                <a href="tel:+7 (910) 351-75-70"> тел. +7 (910) 351-75-70</a>
              </p>
              <p className="phoneic">
                <img className="phoneicon" src={phoneiconb} alt="" />
                <a href="tel:+7 (910) 356-48-86"> тел. +7 (910) 356-48-86</a>
              </p>
            </Col>
            <Col className="col-3 d-flex">
              <Button
                onClick={toLoginPage('/login')}
                className="btn-sm ms-auto"
              >
                Вход для администратора
              </Button>
            </Col>
          </Row>
        </Container>
      </header>
      <Container>
        <Row className="mt-4 blockquote">
          <Col>
            <p>
              <strong>Соберите свой уникальный подарок</strong>
            </p>
          </Col>
        </Row>
      </Container>
    </HomeStyle>
  );
};
