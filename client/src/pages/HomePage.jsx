import styled from 'styled-components';
import { Button } from 'react-bootstrap';
import { NaviBar } from '../components/Navibar';
import logo from '../img/logo.png';
import phoneiconb from '../img/phoneiconb.png';
import { useNavigate, Link } from 'react-router-dom';
import { LoginContext } from '../App';
import { useContext } from 'react';
import { PriceList } from '../components/PriceList';
import { logOut } from '../services/serverRequest';

const HomeStyle = styled.div`
  font-family: 'Montserrat';
  a {
    text-decoration: none;
  }
  .sp-default-logo {
    height: auto;
    max-height: 75px;
    min-width: 75px;
  }
  .phoneicon {
    height: auto;
    max-height: 15px;
  }
  .a-phone {
    font-size: 12px;
  }
  .col {
    text-align: center;
    border: none;
  }
  .slogan {
    min-width: 250px;
  }
`;

export const HomePage = () => {
  const navigate = useNavigate();
  const { auth, setAuth } = useContext(LoginContext);

  const enter = () => {
    navigate('/login');
  };

  const exit = async () => {
    try {
      logOut('/logout', auth.token, { authCode: auth.authCode }).then(() => {
        setAuth({
          authCode: '',
          isLogged: false,
          token: '',
        });
      });
    } catch (e) {
      return e;
    }
  };

  return (
    <HomeStyle>
      <NaviBar />
      <header className="d-flex align-items-center w-100 bg-white mt-2">
        <div className="logo">
          <a href="/">
            <img
              className="sp-default-logo"
              src={logo}
              alt="ГК «Конфи» - Изготовление и продажа детских новогодних подарков в г. Липецк"
            />
          </a>
        </div>
        <div className="ms-2 slogan d-none d-sm-flex">
          <p>Изготовление и продажа детских новогодних подарков</p>
        </div>
        <div className="mx-4 d-none d-lg-block wrap">
          <p className="phoneic text-nowrap">
            <img className="phoneicon " src={phoneiconb} alt="" />
            <a href="tel:+7 (910) 351-75-70" className="a-phone">
              &nbsp; тел. +7 (910) 351-75-70
            </a>
          </p>
          <p className="phoneic text-nowrap">
            <img className="phoneicon" src={phoneiconb} alt="" />
            <a href="tel:+7 (910) 356-48-86" className="a-phone">
              &nbsp; тел. +7 (910) 356-48-86
            </a>
          </p>
        </div>
        {!auth.isLogged ? (
          <Button className="btn-sm mx-2 ms-auto" onClick={enter}>
            Вход для администратора
          </Button>
        ) : (
          <div className="ms-auto mx-2">
            <Link to="/adminpage">Страница администратора</Link>
            <Button className="btn-sm mx-2" onClick={exit}>
              Выход
            </Button>
          </div>
        )}
      </header>
      <p className="mx-auto fw-bold fs-5 text-center ">
        Соберите свой уникальный подарок
      </p>
      <PriceList forchange={false} />
    </HomeStyle>
  );
};
