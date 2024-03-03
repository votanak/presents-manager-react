import { Button, Form, Row } from 'react-bootstrap';
import styled from 'styled-components';
// import { PriceContext } from '../App';
import { useState } from 'react';

const GoodStyle = styled(Row)``;

export const Good = ({ good, forchange }) => {
  // const { setPriceArray } = useContext(PriceContext);
  const [goodInputs, setGoodInputs] = useState(good);
  const [choosedQuantity, setChoosedQuantity] = useState(0);
  const [changing, setChanging] = useState(false);
  const changePriceArray = () => {
    setChanging(false);
  };
  const changeButton = changing ? (
    <Button onClick={changePriceArray}>сохранить</Button>
  ) : (
    <Button onClick={() => setChanging(true)}>редактировать</Button>
  );
  const chooseButtons = !choosedQuantity ? (
    <Button onClick={() => setChoosedQuantity(1)}>Добавить</Button>
  ) : (
    <Form.Group className="d-flex">
      <Button
        id="plus-button"
        className="choose-button mx-2"
        onClick={() => setChoosedQuantity(choosedQuantity - 1)}
      >
        -
      </Button>
      <Form.Label>{choosedQuantity}</Form.Label>
      <Button
        id="plus-button"
        className="choose-button  mx-2"
        onClick={() => setChoosedQuantity(choosedQuantity + 1)}
      >
        +
      </Button>
    </Form.Group>
  );
  return (
    <GoodStyle className="border my-2 p-4">
      <Form className=" d-flex align-items-center">
        <Form.Label className="mx-2  my-auto">Наименование:</Form.Label>
        <Form.Control
          type="input"
          value={goodInputs.name}
          onChange={(e) =>
            setGoodInputs({ ...goodInputs, name: [e.target.value] })
          }
          disabled={!changing}
          className="me-2 flex-grow-1  fw-bold"
        />
        <Form.Label className="mx-2">Цена:</Form.Label>
        <Form.Control
          type="input"
          value={goodInputs.price1}
          onChange={(e) =>
            setGoodInputs({ ...goodInputs, price1: [e.target.value] })
          }
          disabled={!changing}
          className="me-2"
        />
        <Form.Label className="mx-2 my-auto">Вес:</Form.Label>
        <Form.Control
          type="input"
          value={goodInputs.weight1}
          onChange={(e) =>
            setGoodInputs({ ...goodInputs, weight1: [e.target.value] })
          }
          disabled={!changing}
          className="me-2"
        />
        {forchange && changeButton}
        {!forchange && chooseButtons}
      </Form>
    </GoodStyle>
  );
};
