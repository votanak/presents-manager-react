import styled from 'styled-components';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { NaviBar } from '../components/Navibar';
import logo from '../img/logo.png';
import phoneiconb from '../img/phoneiconb.png';
import { useNavigate, Link } from 'react-router-dom';
import { LoginContext } from '../App';
import { useContext } from 'react';
import { PriceList } from '../components/PriceList';

const HomeStyle = styled.div`
  font-family: 'Montserrat';
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
  .col {
    text-align: center;
    border: none;
  }
`;

export const HomePage = () => {
  const navigate = useNavigate();
  const { auth, setAuth } = useContext(LoginContext);
  const enter = () => {
    navigate('/login');
  };
  const exit = () => {
    setAuth({
      isLogged: false,
      token: '',
      authCode: '',
    });
    navigate('/');
    localStorage.removeItem('authCode');
  };

  return (
    <HomeStyle>
      <NaviBar />
      <header id="sp-header" className="animated w-100 bg-white">
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
            <Col id="sp-callback" className="col-md-3 mx-auto">
              <p className="phoneic">
                <img className="phoneicon" src={phoneiconb} alt="" />
                <a href="tel:+7 (910) 351-75-70"> тел. +7 (910) 351-75-70</a>
              </p>
              <p className="phoneic">
                <img className="phoneicon" src={phoneiconb} alt="" />
                <a href="tel:+7 (910) 356-48-86"> тел. +7 (910) 356-48-86</a>
              </p>
            </Col>
            {!auth.isLogged ? (
              <Col className="col-3 text-end">
                <Button className="btn-sm" onClick={enter}>
                  Вход для администратора
                </Button>
              </Col>
            ) : (
              <Col>
                <Link to="/adminpage">Страница администратора</Link>
                <Button className="btn-sm ms-2" onClick={exit}>
                  Выход
                </Button>
              </Col>
            )}
          </Row>
        </Container>
      </header>
      <Container className="mw-100 m-0 sticky-top p-1 bg-white">
        <Row className="mt-4 blockquote">
          <Col>
            <p className="my-0">
              <strong>Соберите свой уникальный подарок</strong>
            </p>
          </Col>
        </Row>
      </Container>
      <PriceList forchange={false} className="w-100 mx-0" />
    </HomeStyle>
  );
};
