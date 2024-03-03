import { useContext, useState } from 'react';
import { PriceContext } from '../App';
import { Container, Row, Form, Button } from 'react-bootstrap';
import { Good } from './Good';

export const PriceList = ({ forchange }) => {
  const { priceArray } = useContext(PriceContext);
  const [selectedGoods, setSelectedGoods] = useState({});
  let categories = priceArray && [
    ...new Set(priceArray.map((el) => el.category)),
  ];
  console.log(categories);

  const summ = (field) => {
    console.log(priceArray && priceArray.find((el1) => el1.id === 1));
    return (
      priceArray &&
      Object.keys(selectedGoods).reduce((acc, el) => {
        console.log(priceArray.find((el1) => el1.id === 1));
        return (
          acc +
          priceArray.find((el1) => el1.id === +el)[field] * selectedGoods[el]
        );
      }, 0)
    );
  };

  return (
    <Container className=" w-100">
      <Row className="mt-2 text-center">
        <h2>Прайс-лист</h2>
      </Row>
      {priceArray &&
        priceArray.map((good, ind) =>
          good.producer ? (
            <Good
              forchange={forchange}
              good={good}
              key={good.id}
              selectedGoods={selectedGoods}
              setSelectedGoods={setSelectedGoods}
            />
          ) : (
            <Row className="group" key={ind}>
              <p>{good.name}</p>
            </Row>
          ),
        )}
      {!forchange && (
        <Row className="sticky-bottom py-4 bg-light">
          <Form className="d-flex">
            <Form.Label className="fs-5">Параметры подарка:</Form.Label>
            <Form.Label className="fs-5">
              Суммарный вес: {Math.round(summ('weight1'))} г.
            </Form.Label>
            <Form.Label className="fs-5">
              Суммарная стоимость: {Math.round(summ('price1'))} руб.
            </Form.Label>
            <Button type="submit" className="ms-auto">
              Отправить для заказа
            </Button>
          </Form>
        </Row>
      )}
    </Container>
  );
};
