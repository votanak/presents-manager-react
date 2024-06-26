import { useContext, useState } from 'react';
import { PriceContext } from '../App';
import { Container, Form, Button, Accordion } from 'react-bootstrap';
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
  .btn-send {
    font-size: 14px;
  }
  .accordion {
    max-width: 100%;
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
              <strong>Упаковка</strong>
              <div className="ms-2">
                {selectedGoods.pack &&
                  `${selectedGoods.pack.name}, ${selectedGoods.pack.giftWeight} грамм`}
              </div>
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
            <div className="sticky-bottom align-items-center p-2 mt-2 bg-light">
              <div className="fs-5 mx-auto text-center  text-decoration-underline">
                Параметры подарка:
              </div>
              <div className="d-flex p-2  align-items-center justify-content-start flex-wrap">
                <div className="d-flex fs-6 text-nowrap mb-2 mx-2  text-start  align-items-top">
                  Вес содержимого: {Math.round(summ('weight1'))} г.
                </div>
                <div className="d-flex fs-6 text-nowrap mb-2 mx-2 text-start text-align-top">
                  Стоимость подарка: {Math.round(summ('price1'))} руб.
                </div>
                <div className="d-flex fs-6 text-nowrap mb-2 mx-2 justify-content-center mb-0 text-start  align-items-center">
                  Количество подарков:
                  <Form.Group className="d-flex align-items-center">
                    <Button
                      id="plus-button"
                      className="choose-button mx-2 pt-0 btn-sm h-auto"
                      onClick={decrGiftQuant}
                    >
                      -
                    </Button>
                    <Form.Label className="m-0 text-center quantity fs-6">
                      {selectedGoods.giftQuantity}
                    </Form.Label>
                    <Button
                      id="plus-button"
                      className="d-flex choose-button mx-2 btn-sm pt-0 h-auto"
                      onClick={incrGiftQuant}
                    >
                      +
                    </Button>
                  </Form.Group>
                </div>
                <div className="d-flex fs-6 text-nowrap mb-2 mx-2 justify-content-center text-center fw-bold">
                  Стоимость заказа:
                  {` ${
                    Math.round(summ('price1')) * selectedGoods.giftQuantity
                  }`}
                  руб.
                </div>
              </div>
              <div className="d-flex justify-content-end align-items-top mt-auto">
                <Button
                  onClick={() => setModalShow(true)}
                  className="w-auto h-auto text-nowrap btn-send"
                >
                  Отправить заказ
                </Button>
              </div>
            </div>
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
