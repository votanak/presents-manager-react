import { useContext, useState } from 'react';
import { PriceContext } from '../App';
import { Container, Row, Form, Button, Accordion } from 'react-bootstrap';
import { Good } from './Good';

export const PriceList = ({ forchange }) => {
  const { priceArray } = useContext(PriceContext);
  const [selectedGoods, setSelectedGoods] = useState({});
  let categories = priceArray && [
    ...new Set(priceArray.map((el) => el.category)),
  ];

  const summ = (field) => {
    return (
      priceArray &&
      Object.keys(selectedGoods).reduce((acc, el) => {
        return (
          acc +
          priceArray.find((el1) => el1.id === +el)[field] * selectedGoods[el]
        );
      }, 0)
    );
  };

  return (
    <Container className="w-100">
      <Accordion>
        {priceArray &&
          categories.map((cat, ind) => (
            <Accordion.Item eventKey={ind} key={ind}>
              <Accordion.Header>{cat}</Accordion.Header>
              <Accordion.Body>
                {priceArray
                  .filter((good1) => good1.category === cat)
                  .map((good) => (
                    <Good
                      forchange={forchange}
                      good={good}
                      key={good.id}
                      selectedGoods={selectedGoods}
                      setSelectedGoods={setSelectedGoods}
                    />
                  ))}
              </Accordion.Body>
            </Accordion.Item>
          ))}
      </Accordion>
      {!forchange && (
        <Row className="sticky-bottom py-4 bg-light ">
          <Form className="d-flex justify-content-around">
            <Form.Label className="fs-5">Параметры подарка:</Form.Label>
            <Form.Label className="fs-5">
              Суммарный вес: {Math.round(summ('weight1'))} г.
            </Form.Label>
            <Form.Label className="fs-5">
              Суммарная стоимость: {Math.round(summ('price1'))} руб.
            </Form.Label>
            <Button type="submit" className="">
              Отправить для заказа
            </Button>
          </Form>
        </Row>
      )}
    </Container>
  );
};