import styled from 'styled-components';
import { Row, Col, Container } from 'react-bootstrap';

const FooterStyle = styled.div`
  line-height: 1.5;
  font-size: 16px;
  -webkit-transition: all 400ms ease;
  transition: all 400ms ease;
  font-family: 'Montserrat', sans-serif;
  color: #000;
  a,
  a:hover,
  a:focus,
  a:active {
    text-decoration: none;
  }
  #sp-bottom {
    background-image: url('/pic/fbg.jpg');
    background-repeat: no-repeat;
    background-size: cover;
    background-attachment: scroll;
    background-position: 50% 100%;
    background-color: #191c1c;
    color: #ffffff;
    padding: 50px 0 50px 0;
  }
  #sp-bottom .sp-module .sp-module-title {
    text-transform: none;
    font-weight: normal;
    font-size: 24px;
    color: #fff;
    border-bottom: 0px solid #3b7ee2;
    width: min-content;
    padding-bottom: 0px;
    padding-top: 10px;
    border-radius: 0px;
  }
  .phoneicon {
    width: 25px;
    height: auto;
    margin: 0;
  }
  .socfoot img {
    width: 30px;
    margin-right: 15px;
  }
  .socfoot {
    display: flex;
    align-items: center;
  }
  .sp-module ul > li > a {
    display: block;
    padding: 5px 0;
    line-height: 45px;
    padding: 0;
    -webkit-transition: 300ms;
    transition: 300ms;
  }
  #sp-bottom a {
    color: #ffffff;
  }
  .nav > li > a {
    position: relative;
  }
  .sp-module:first-child {
    margin-top: 0;
  }
  .bottommenu a {
    line-height: 1.4 !important;
    padding-bottom: 7px !important;
  }
  .sp-module ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  .fEDieA #sp-bottom .sp-module .sp-module-title {
    text-transform: none;
    font-weight: normal;
    font-size: 24px;
    color: #fff;
    border-bottom: 0px solid #3b7ee2;
    width: min-content;
    padding-bottom: 0px;
    padding-top: 10px;
    border-radius: 0px;
  }

  .h1,
  .h2,
  .h3,
  .h4,
  .h5,
  .h6,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-family: 'Cuprum';
  }
  .sp-module:first-child {
    margin-top: 0;
  }
  #sp-bottom3 iframe {
    border-radius: 15px;
  }
  .sp-module ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  ul {
    display: block;
    list-style-type: disc;
    margin-block-start: 1em;
    margin-block-end: 1em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    padding-inline-start: 40px;
    unicode-bidi: isolate;
  }
  .row {
    margin-right: -15px;
    margin-left: -15px;
  }
`;

export const Footer = () => {
  return (
    <FooterStyle>
      <section id="sp-bottom">
        <Container>
          <Row>
            <div id="sp-bottom1" className="col-sm-4 col-md-4">
              <div className="sp-module ">
                <h3 className="sp-module-title">Контакты</h3>
                <div className="sp-module-content">
                  <div className="custom">
                    <p className="phoneic">
                      <img
                        className="phoneicon"
                        src="/pic/phoneiconw.png"
                        alt=""
                      />
                      <span>
                        <a href="tel: +7 (910) 351-75-70">+7 (910) 351-75-70</a>
                      </span>
                    </p>
                    <p className="phoneic">
                      <img
                        className="phoneicon"
                        src="/pic/phoneiconw.png"
                        alt=""
                      />
                      <span>
                        <a href="tel: +7 (910) 356-48-86">+7 (910) 356-48-86</a>
                      </span>
                    </p>
                    <p className="phoneic">
                      <img
                        className="phoneicon"
                        src="/pic/mailiconw.png"
                        alt=""
                      />
                      <a
                        href="mailto:konfi-m@mail.ru"
                        target="_blank"
                        rel="nofollow"
                      >
                        konfi-m@mail.ru
                      </a>
                    </p>
                    <p className="phoneic">
                      <img
                        className="phoneicon"
                        src="/pic/lociconw.png"
                        alt=""
                      />
                      398059, г. Липецк, ул. Первомайская, д. 55
                    </p>
                    <div className="socfoot">
                      <div className="socicon">
                        <a href="#" rel="noopener">
                          <img src="/pic/wa.png" alt="" />
                        </a>
                      </div>
                      <div className="socicon">
                        <a href="#" rel="noopener">
                          <img src="/pic/vk.png" alt="" />
                        </a>
                      </div>
                      <div className="socicon">
                        <a href="#" rel="noopener">
                          <img src="/pic/vb.png" alt="" />
                        </a>
                      </div>
                      <div className="socicon">
                        <a href="#">
                          <img src="/pic/tg.png" alt="" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div id="sp-bottom2" className="col-sm-2 col-md-2">
              <div className="sp-column ">
                <div className="sp-module ">
                  <h3 className="sp-module-title">Навигация</h3>
                  <div className="sp-module-content">
                    <ul className="nav menu bottommenu">
                      <li className="item-663">
                        <a href="/otzyvy"> Отзывы</a>
                      </li>
                      <li className="item-1537">
                        <a href="/"> Главная</a>
                      </li>
                      <li className="item-788">
                        <a href="/katalog"> Каталог</a>
                      </li>
                      <li className="item-700">
                        <a href="/o-nas"> О компании</a>
                      </li>
                      <li className="item-1394">
                        <a href="/oplata-i-dostavka"> Оплата и доставка</a>
                      </li>
                      <li className="item-545">
                        <a href="/kontakty"> Контакты</a>
                      </li>
                      <li className="item-1464">
                        <a href="/prajs"> Прайс</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div id="sp-bottom3" className="col-sm-6 col-md-6">
              <div className="sp-column ">
                <div className="sp-module ">
                  <div className="sp-module-content">
                    <div className="custom">
                      <iframe
                        src="https://yandex.ru/map-widget/v1/?um=constructor%3A06434418f932a63c569348c8acbd1e9473db76fa8a9f2a7a2017315b95fdb7c6&amp;source=constructor"
                        width="100%"
                        height="250"
                      ></iframe>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Row>
        </Container>
      </section>
    </FooterStyle>
  );
};
