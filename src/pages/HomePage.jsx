import styled from 'styled-components';
import { Container, Row, Col } from 'react-bootstrap';
import { NaviBar } from '../components/Navibar';

const HomeStyle = styled.div`
  font-family: 'Montserrat';
  .col {
    text-align: center;
    border: 1px grey solid;
  }
`;
const ContainerStyle = styled(Container)`
  font-family: Calibri;
  .col {
    text-align: center;
    border: 1px grey solid;
  }
`;

export const HomePage = () => {
  return (
    <HomeStyle>
      <NaviBar />
      <ContainerStyle>
        <Row>
          <Col>1 of 2</Col>
        </Row>
        <Row>
          <Col>1 of 3</Col>
          <Col>2 of 3</Col>
          <Col>3 of 3</Col>
        </Row>
      </ContainerStyle>
      <header id="sp-header" class="animated menu-fixed-out">
        <Container>
          <Row>
            <div id="sp-logo" class="col-xs-3 col-sm-1 col-md-1">
              <div class="sp-column ">
                <div class="logo">
                  <a href="/">
                    <img
                      class="sp-default-logo"
                      src="/images/logo.png"
                      alt="ГК «Конфи» - Изготовление и продажа детских новогодних подарков в г. Липецк"
                    />
                  </a>
                </div>
              </div>
            </div>
          </Row>
        </Container>
      </header>
    </HomeStyle>
  );
};
