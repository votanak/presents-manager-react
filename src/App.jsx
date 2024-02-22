import styled from 'styled-components';
import { Container, Row, Col } from 'react-bootstrap';

const AppStyle = styled.div`
  font-family: Calibri;
  .col {
    text-align: center;
    border: 1px grey solid;
  }
`;
const ContainerStyle = styled.Container`
  font-family: Calibri;
  .col {
    text-align: center;
    border: 1px grey solid;
  }
`;

export const App = () => {
  return (
    <AppStyle>
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
