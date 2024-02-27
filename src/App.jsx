import styled from 'styled-components';
import { Container, Row, Col } from 'react-bootstrap';
import { NaviBar } from './components/Navibar';

const AppStyle = styled.div`
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

export const App = () => {
  return (
    <AppStyle>
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
    </AppStyle>
  );
};
