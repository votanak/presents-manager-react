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
  .form-control {
    width: 50px;
  }
`;

export const PriceList = ({ forChange }) => {
  const { priceArray, packArray } = useContext(PriceContext);
  const [selectedGoods, setSelectedGoods] = useState({ giftQuantity: 1 });
  const [modalShow, setModalShow] = useState(false);
  const [packAccShow, setPackAccShow] = useState(!forChange && ['0']);

  const summ = (field) =>
    Object.keys(selectedGoods).reduce((acc, el) => {
      let add =
        !(el === 'giftQuantity') &&
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
      giftQuantity: selectedGoods.giftQuantity + 1,
    });
  };
  const decrGiftQuant = () => {
    selectedGoods.giftQuantity === 1
      ? setSelectedGoods({ ...selectedGoods, giftQuantity: 1 })
      : setSelectedGoods({
          ...selectedGoods,
          giftQuantity: selectedGoods.giftQuantity - 1,
        });
  };
  return (
    <PriceStyle>
      {packArray && (
        <Accordion
          activeKey={packAccShow}
          onSelect={(eventKey) => {
            setPackAccShow(eventKey);
          }}
          className="mb-4"
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
                <div className="d-flex align-items-center m-0" key={pack.id}>
                  <Pack forChange={forChange} pack={pack} />
                  {!forChange && (
                    <Form.Check
                      type="radio"
                      name="packRadio"
                      id={pack.id}
                      onChange={() => {
                        setPackAccShow([]);
                        if (!forChange) {
                          setSelectedGoods({ ...selectedGoods, pack: pack });
                        }
                      }}
                      aria-label="radio 1"
                    />
                  )}
                </div>
              ))}
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      )}
      {(selectedGoods.pack || forChange) && (
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
                            forChange={forChange}
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
          {selectedGoods.pack && (
            <Container className="sticky-bottom p-2 bg-light">
              <Row className="fs-4 justify-content-center text-decoration-underline">
                Параметры подарка:
              </Row>
              <Row className="d-flex p-2  align-items-center">
                <Col className="d-flex">
                  <Col className="fs-5 text-nowrap  mb-2 text-start  align-items-top">
                    Вес содержимого: {Math.round(summ('weight1'))} г.
                  </Col>
                  <Col className="d-flex fs-5 text-nowrap mb-2 text-start text-align-top">
                    Стоимость подарка: {Math.round(summ('price1'))} руб.
                  </Col>
                </Col>
                <Col className="d-flex align-items-center">
                  <Col className="d-flex fs-5 text-nowrap mb-0 text-start  align-items-center">
                    Количество подарков:
                    <Form.Group className="d-flex my-2 align-items-center">
                      <Button
                        id="plus-button"
                        className="choose-button mx-2 btn-sm h-auto"
                        onClick={decrGiftQuant}
                      >
                        -
                      </Button>
                      <Form.Label className="m-0 text-center quantity fs-6">
                        {selectedGoods.giftQuantity}
                      </Form.Label>
                      <Button
                        id="plus-button"
                        className="d-flex choose-button mx-2 btn-sm h-auto"
                        onClick={incrGiftQuant}
                      >
                        +
                      </Button>
                    </Form.Group>
                  </Col>
                  <Col className="fs-5 text-nowrap text-start ps-2">
                    Стоимость заказа:
                    {` ${
                      Math.round(summ('price1')) * selectedGoods.giftQuantity
                    }`}
                    руб.
                  </Col>
                </Col>
                <Col className="d-flex justify-content-end align-items-top mt-auto">
                  <Button
                    onClick={() => setModalShow(true)}
                    className="w-auto h-auto text-nowrap"
                  >
                    Отправить заказ
                  </Button>
                </Col>
              </Row>
            </Container>
          )}
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
