import { useContext, useState } from 'react';
import { PriceContext } from '../App';
import { Container, Row, Form, Button, Accordion } from 'react-bootstrap';
import { Good } from './Good';
import { Pack } from './Pack';
import styled from 'styled-components';
import { ModalSendForm } from './ModalSendForm';
import { Loader } from './Loader';

const PriceStyle = styled(Container)`
  min-width: 300px;
`;

export const PriceList = ({ forchange }) => {
  const { priceArray, packArray } = useContext(PriceContext);
  const [selectedGoods, setSelectedGoods] = useState({});
  const [modalShow, setModalShow] = useState(false);

  const summ = (field) => {
    return (
      priceArray &&
      Object.keys(selectedGoods).reduce((acc, el) => {
        return acc + selectedGoods[el].good[field] * selectedGoods[el].quantity;
      }, 0)
    );
  };

  return (
    <PriceStyle className="w-100">
      <Accordion>
        {packArray &&
          [...new Set(priceArray.map((el) => el.category))].map((cat, ind) => (
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
      <Accordion>
        {priceArray &&
          [...new Set(priceArray.map((el) => el.category))].map((cat, ind) => (
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
      {!forchange &&
        (!!priceArray ? (
          <Row className="sticky-bottom py-2 bg-light ">
            <Form className="d-flex flex-wrap justify-content-around">
              <Form.Label className="fs-5 d-none d-sm-block">
                Параметры подарка:
              </Form.Label>
              <Form.Label className="fs-5">
                Суммарный вес: {Math.round(summ('weight1'))} г.
              </Form.Label>
              <Form.Label className="fs-5">
                Суммарная стоимость: {Math.round(summ('price1'))} руб.
              </Form.Label>
              <Button onClick={() => setModalShow(true)} className="btn-sm">
                Отправить для заказа
              </Button>
            </Form>
          </Row>
        ) : (
          <Loader />
        ))}
      <ModalSendForm
        show={modalShow}
        setShow={setModalShow}
        selectedGoods={selectedGoods}
      />
    </PriceStyle>
  );
};
