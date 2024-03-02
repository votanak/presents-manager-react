import { useContext } from 'react';
import { LoginContext } from '../App';
import { Container, Row } from 'react-bootstrap';
import { Good } from './Good';

export const PriceList = ({ forchange }) => {
  const { auth } = useContext(LoginContext);
  const { priceObject } = useContext(LoginContext);

  return (
    <Container>
      <Row className="mt-2 text-center">
        <h2>Прайс-лист</h2>
      </Row>
      {priceObject &&
        priceObject.map((e) =>
          e.Производитель ? (
            <Good auth={auth} />
          ) : (
            <Row className="group">
              <p>{e.Наименование}</p>
            </Row>
          ),
        )}
    </Container>
  );
};
