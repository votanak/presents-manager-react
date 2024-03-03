import { Button, Form, Row } from 'react-bootstrap';
import styled from 'styled-components';
// import { PriceContext } from '../App';
import { useState } from 'react';

const GoodStyle = styled(Row)``;

export const Good = ({ good, forchange, selectedGoods, setSelectedGoods }) => {
  // const { setPriceArray } = useContext(PriceContext);
  const [goodInputs, setGoodInputs] = useState(good);
  const [changing, setChanging] = useState(false);
  const changePriceArray = () => {
    setChanging(false);
  };

  const decrease = () => {
    if (selectedGoods[good.id] === 1) {
      const { [good.id]: _, ...rest } = selectedGoods;
      setSelectedGoods(rest);
    } else {
      setSelectedGoods({
        ...selectedGoods,
        [good.id]: selectedGoods[good.id] - 1,
      });
    }
  };

  const changeButton = changing ? (
    <Button onClick={changePriceArray}>сохранить</Button>
  ) : (
    <Button onClick={() => setChanging(true)}>редактировать</Button>
  );
  const chooseButtons = !selectedGoods[good.id] ? (
    <Button
      onClick={() => setSelectedGoods({ ...selectedGoods, [good.id]: 1 })}
      className="btn-sm"
    >
      Добавить
    </Button>
  ) : (
    <Form.Group className="d-flex align-items-center">
      <Button
        id="plus-button"
        className="choose-button mx-2 btn-sm"
        onClick={decrease}
      >
        -
      </Button>
      <Form.Label className="m-0">{selectedGoods[good.id]}</Form.Label>
      <Button
        id="plus-button"
        className="choose-button  mx-2 btn-sm"
        onClick={() =>
          setSelectedGoods({
            ...selectedGoods,
            [good.id]: selectedGoods[good.id] + 1,
          })
        }
      >
        +
      </Button>
    </Form.Group>
  );
  return (
    <GoodStyle className="border my-2 py-4 rounded-3">
      <Form className=" d-flex align-items-center">
        <Form.Text
          disabled={!changing}
          className="me-2 flex-grow-1 fs-5  fw-bold"
        >
          {goodInputs.name}
        </Form.Text>
        <Form.Label className="mx-2 my-auto">Цена:</Form.Label>
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
