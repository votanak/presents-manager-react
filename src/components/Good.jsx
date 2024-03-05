import { Button, Form, Image, Row } from 'react-bootstrap';
import styled from 'styled-components';
// import { PriceContext } from '../App';
import { useState } from 'react';
import candyImg from '../img/candy-noname.svg';

const GoodStyle = styled(Row)`
    .form-control {
    width: 70px;
  }
  .quantity {
    min-width: 20px;
  }

  img {
    max-width: 50px;
  }
`;

export const Good = ({ good, forchange, selectedGoods, setSelectedGoods }) => {
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
      className="btn-sm my-2"
    >
      Добавить
    </Button>
  ) : (
    <Form.Group className="d-flex my-2 align-items-center">
      <Button
        id="plus-button"
        className="choose-button mx-2 btn-sm"
        onClick={decrease}
      >
        -
      </Button>
      <Form.Label className="m-0 text-center quantity">
        {selectedGoods[good.id]}
      </Form.Label>
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
    <GoodStyle className="border my-2 py-2 rounded-3">
      <Form className=" d-flex align-items-center flex-wrap justify-content-end">
        <Form.Group className="d-flex me-auto flex-shrink-1 align-items-center ">
          <Image src={candyImg} fluid rounded className="border mx-2"></Image>
          <Form.Text className="me-2 my-0 fs-6 fw-bold" rows="2">
            {goodInputs.name}
          </Form.Text>
        </Form.Group>
        <Form.Group className="d-flex">
          <Form.Label className="mx-2 my-auto text-nowrap">
            Цена, руб.:
          </Form.Label>
          <Form.Control
            type="input"
            value={goodInputs.price1}
            onChange={(e) =>
              setGoodInputs({ ...goodInputs, price1: [e.target.value] })
            }
            disabled={!changing}
            className="me-2 p-0 text-center"
          />
        </Form.Group>
        <Form.Group className="d-flex">
          <Form.Label className="mx-2 my-auto text-nowrap">Вес, г:</Form.Label>
          <Form.Control
            type="input"
            value={goodInputs.weight1}
            onChange={(e) =>
              setGoodInputs({ ...goodInputs, weight1: [e.target.value] })
            }
            disabled={!changing}
            className="me-2 text-center"
          />
        </Form.Group>
        {forchange && changeButton}
        {!forchange && chooseButtons}
      </Form>
    </GoodStyle>
  );
};
