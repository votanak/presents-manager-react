import { useContext, useState } from 'react';
import { PriceContext } from '../App';
import { Container, Row, Col, Form, Button, Accordion } from 'react-bootstrap';
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

  const summ = (field) =>
    Object.keys(selectedGoods).reduce((acc, el) => {
      let add =
        !!Object.values(selectedGoods).length &&
        (el === 'pack'
          ? field === 'weight1'
            ? 0
            : selectedGoods.pack[field]
          : selectedGoods[el].good[field] * selectedGoods[el].quantity);
      return acc + add;
    }, 0);

  return (
    <PriceStyle className="w-100">
      <Accordion className=" mb-4">
        {packArray && (
          <Accordion.Item>
            <Accordion.Header>Упаковка</Accordion.Header>
            <Accordion.Body>
              <Form>
                {packArray.map((pack) => (
                  <Form.Label
                    key={pack.id}
                    className="d-flex align-items-center"
                    htmlFor={pack.id}
                  >
                    <Pack forchange={forchange} pack={pack} />
                    <Form.Check
                      type="radio"
                      name={'packRadio'}
                      id={pack.id}
                      onChange={() => {
                        setSelectedGoods({
                          pack: pack,
                        });
                      }}
                      aria-label="radio 1"
                    />
                  </Form.Label>
                ))}
              </Form>
            </Accordion.Body>
          </Accordion.Item>
        )}
      </Accordion>
      {!!Object.values(selectedGoods).length && (
        <Accordion>
          {priceArray &&
            [...new Set(priceArray.map((el) => el.category))].map(
              (cat, ind) => (
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
              ),
            )}
        </Accordion>
      )}
      {!forchange ? (
        Object.hasOwn(selectedGoods, 'pack') && (
          <Container className="sticky-bottom p-2 bg-light">
            <Row className="fs-4 justify-content-center text-decoration-underline">
              Параметры подарка:
            </Row>
            <Row className="d-flex p-2  ">
              <Col className="fs-5 text-nowrap  mb-2 text-start">
                Суммарный вес: {Math.round(summ('weight1'))} г.
              </Col>
              <Col className="fs-5 text-nowrap mb-2 text-start">
                Вместимость упаковки:{' '}
                {Math.round(selectedGoods.pack.giftWeight)} г.
              </Col>
              <Col className="fs-5 text-nowrap mb-2 text-start">
                Итого стоимость: {Math.round(summ('price1'))} руб.
              </Col>
              <Button
                onClick={() => setModalShow(true)}
                className="w-auto h-auto"
              >
                Отправить для заказа
              </Button>
            </Row>
          </Container>
        )
      ) : (
        <Loader />
      )}
      <ModalSendForm
        show={modalShow}
        setShow={setModalShow}
        selectedGoods={selectedGoods}
      />
    </PriceStyle>
  );
};
