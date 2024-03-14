import { Form, Image, Row } from 'react-bootstrap';
import styled from 'styled-components';
import giftBox from '../img/gift-box.svg';

const PackStyle = styled(Row)`
  .form-control {
    width: 50px;
  }
  .quantity {
    min-width: 20px;
  }

  img {
    max-width: 50px;
  }
`;

export const Pack = ({ forCange, pack }) => {
  return (
    <PackStyle className="border my-2 py-2 rounded-3">
      <div className=" d-flex align-items-center flex-wrap justify-content-end">
        <Form.Group className="d-flex me-auto flex-shrink-1 align-items-center ">
          <Image src={giftBox} fluid rounded className="border mx-2"></Image>
          <Form.Text className="me-2 my-0 fs-6 fw-bold" rows="2">
            {pack.name}
          </Form.Text>
        </Form.Group>
        <Form.Label className="mx-2 my-auto text-nowrap">
          Вес упаковки - {pack.packWeight} г.
        </Form.Label>
        <Form.Label className="mx-2 my-auto text-nowrap">
          Вместительность - {pack.giftWeight} г.
        </Form.Label>
        <Form.Label className="mx-2 my-auto text-nowrap">
          Цена - {pack.price} руб.
        </Form.Label>
      </div>
    </PackStyle>
  );
};
