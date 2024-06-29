import { Footer } from '../components/Footer';
import styled from 'styled-components';

const KontaktyStyle = styled.div`
  @media (min-width: 992px) {
    width: 80%;
  }
  .kontakty-content {
    font-family: Montserrat;
    & a {
      padding: 10px;
      margin-left: 15px;
      text-decoration: none;
      color: black;
      border-radius: 15px;
      transition: 1000ms;
    }
    & a:hover {
      background-color: royalblue;
      color: white;
      margin-left: 30px;
    }
  }
  .phoneicon {
    width: 25px;
    height: auto;
    margin: 0;
  }
  .socicon {
    width: 50px;
    padding: 10px;
    margin-left: 10px;
    text-decoration: none;
    border-radius: 15px;
    transition: 500ms;
    &:hover {
      padding: 0px;
    }
    & img {
      width: 100%;
    }
  }
`;

export const Kontakty = () => {
  return (
    <KontaktyStyle className="p-4 mx-auto">
      <h1 className="sppb-title-heading">
        Контакты «Конфи» - Изготовление и продажа детских новогодних подарков в
        г. Липецк
      </h1>
      <div className="kontakty-content fs-5 py-2">
        <p className="phoneic">
          <img className="phoneicon" src="/pic/phoneiconb.png" alt="" />
          <span>
            <a href="tel: +7 (910) 351-75-70">+7 (910) 351-75-70</a>
          </span>
        </p>
        <p className="phoneic">
          <img className="phoneicon" src="/pic/phoneiconb.png" alt="" />
          <span>
            <a href="tel:+7 (910) 356-48-86">+7 (910) 356-48-86</a>
          </span>
        </p>
        <p className="phoneic">
          <img className="phoneicon" src="/pic/mailiconb.png" alt="" />
          <a href="mailto:konfi-m@mail.ru" target="_blank" rel="nofollow">
            konfi-m@mail.ru
          </a>
        </p>
        <p className="phoneic">
          <img className="phoneicon" src="/pic/lociconb.png" alt="" />
          <span className="ms-3 p-2">
            398059, г. Липецк, ул. Первомайская, д. 55
          </span>
        </p>
      </div>
      <div className="socfoot d-flex mb-2 align-items-center">
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
      <div className="custom">
        <iframe
          src="https://yandex.ru/map-widget/v1/?um=constructor%3A06434418f932a63c569348c8acbd1e9473db76fa8a9f2a7a2017315b95fdb7c6&amp;source=constructor"
          width="100%"
          height="400"></iframe>
      </div>
      <Footer />
    </KontaktyStyle>
  );
};
