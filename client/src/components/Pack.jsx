import { Form } from 'react-bootstrap';
import styled from 'styled-components';
// import giftBox from '../img/gift-box.svg';
import { Img } from './Img';

const PackStyle = styled.div`
  .form-control {
    width: 50px;
  }
  .quantity {
    min-width: 20px;
  }

  img {
    max-width: 40px;
  }
`;

export const Pack = ({ forChange, pack }) => {
  return (
    <PackStyle className="d-flex border my-2 py-2 rounded-3 flex-fill mx-2">
      <Img id={pack.id} picture={pack.picture} forChange={forChange} />
      <Form.Label
        className="d-flex align-items-center flex-wrap mb-0  flex-fill"
        htmlFor={pack.id}
      >
        <div className="me-2 my-0 fs-6 fw-bold" rows="2">
          {pack.name}
        </div>
        <div className="d-flex ms-auto">
          <div className="mx-2 text-nowrap">
            Вес упаковки - {pack.weight1} г.
          </div>
          <div className="mx-2 text-nowrap">
            Вместительность - {pack.giftWeight} г.
          </div>
          <div className="mx-2 text-nowrap">Цена - {pack.price1} руб.</div>
        </div>
      </Form.Label>
    </PackStyle>
  );
};
