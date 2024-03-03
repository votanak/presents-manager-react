import { useContext } from 'react';
import { PriceContext } from '../App';
import { Container, Row, Form, Button } from 'react-bootstrap';
import { Good } from './Good';

export const PriceList = ({ forchange }) => {
  const { priceArray } = useContext(PriceContext);

  let categories = priceArray && [
    ...new Set(priceArray.map((el) => el.category)),
  ];
  console.log(categories);

  return (
    <Container>
      <Row className="mt-2 text-center">
        <h2>Прайс-лист</h2>
      </Row>
      {priceArray &&
        priceArray.map((row, ind) =>
          row.producer ? (
            <Good forchange={forchange} good={row} key={row.id} />
          ) : (
            <Row className="group" key={ind}>
              <p>{row.name}</p>
            </Row>
          ),
        )}
      {!forchange && (
        <Row className="sticky-bottom py-4 bg-light">
          <Form>
            <Form.Label className="fs-4">Выбрано:</Form.Label>
            <Button className="ms-auto">Отправить для заказа</Button>
          </Form>
        </Row>
      )}
    </Container>
  );
};
