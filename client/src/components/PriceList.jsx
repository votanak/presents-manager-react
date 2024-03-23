import { useContext, useState } from 'react';
import { PriceContext } from '../App';
import { Container, Row, Col, Form, Button, Accordion } from 'react-bootstrap';
import { Good } from './Good';
import { Pack } from './Pack';
import styled from 'styled-components';
import { ModalSendForm } from './ModalSendForm';
// import { Loader } from './Loader';

const PriceStyle = styled(Container)`
  min-width: 300px;
`;

export const PriceList = ({ forchange }) => {
  const { priceArray, packArray } = useContext(PriceContext);
  const [selectedGoods, setSelectedGoods] = useState({});
  const [modalShow, setModalShow] = useState(false);
  const [packAccShow, setPackAccShow] = useState([]);

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

  const incrGiftQuant = () => {
    setSelectedGoods({
      ...selectedGoods,
      giftQuantity: (selectedGoods.giftQuantity = -1),
    });
  };
  const decrGiftQuant = () => {
    selectedGoods.giftQuantity === 1
      ? setSelectedGoods({ ...selectedGoods, giftQuantity: 1 })
      : setSelectedGoods({
          ...selectedGoods,
          giftQuantity: (selectedGoods.giftQuantity = -1),
        });
  };

  return (
    <PriceStyle className="w-100">
      {packArray && (
        <Accordion
          activeKey={packAccShow}
          onSelect={(eventKey) => {
            setPackAccShow(eventKey);
          }}
          className=" mb-4"
          alwaysOpen
        >
          <Accordion.Item eventKey="0">
            <Accordion.Header>
              <strong>Упаковка</strong>&nbsp; &nbsp; &nbsp;
              {selectedGoods.pack &&
                `${selectedGoods.pack.name}, ${selectedGoods.pack.giftWeight} грамм`}
            </Accordion.Header>
            <Accordion.Body className="p-2">
              {packArray.map((pack) => (
                <Form.Label
                  key={pack.id}
                  className="d-flex align-items-center m-0"
                  htmlFor={pack.id}
                >
                  <Pack forchange={forchange} pack={pack} />
                  {!forchange && (
                    <Form.Check
                      type="radio"
                      name="packRadio"
                      id={pack.id}
                      onChange={() => {
                        setPackAccShow([]);
                        if (!forchange)
                          setSelectedGoods({
                            pack: pack,
                          });
                      }}
                      aria-label="radio 1"
                    />
                  )}
                </Form.Label>
              ))}
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      )}
      {(!!Object.values(selectedGoods).length || forchange) && (
        <>
          <Accordion>
            {priceArray &&
              [...new Set(priceArray.map((el) => el.category))].map(
                (cat, ind) => (
                  <Accordion.Item eventKey={ind} key={ind}>
                    <Accordion.Header>
                      <strong>{cat}</strong>
                    </Accordion.Header>
                    <Accordion.Body className="p-2">
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
          <Container className="sticky-bottom p-2 bg-light">
            <Row className="fs-4 justify-content-center text-decoration-underline">
              Параметры подарка:
            </Row>
            <Row className="d-flex p-2  ">
              <Col className="fs-5 text-nowrap  mb-2 text-start">
                Вес содержимого: {Math.round(summ('weight1'))} г.
              </Col>
              <Col className="d-flex fs-5 text-nowrap mb-2 text-start">
                Количество подарков:
                <Form.Group className="d-flex my-2 align-items-center">
                  <Button
                    id="plus-button"
                    className="choose-button mx-2 btn-sm"
                    onClick={decrGiftQuant}
                  >
                    -
                  </Button>
                  <Form.Label className="m-0 text-center quantity">
                    {selectedGoods.giftQuantity}
                  </Form.Label>
                  <Button
                    id="plus-button"
                    className="choose-button  mx-2 btn-sm"
                    onClick={incrGiftQuant}
                  >
                    +
                  </Button>
                </Form.Group>
              </Col>
              <Col className="fs-5 text-nowrap mb-2 text-start">
                Стоимость подарка: {Math.round(summ('price1'))} руб.
              </Col>
              <Button
                onClick={() => setModalShow(true)}
                className="w-auto h-auto"
              >
                Отправить для заказа
              </Button>
            </Row>
          </Container>
        </>
      )}
      <ModalSendForm
        show={modalShow}
        setShow={setModalShow}
        selectedGoods={selectedGoods}
      />
    </PriceStyle>
  );
};
