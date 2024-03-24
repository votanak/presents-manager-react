import { Form, Row } from 'react-bootstrap';
import styled from 'styled-components';
// import giftBox from '../img/gift-box.svg';
import { Img } from './Img';

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

export const Pack = ({ forChange, pack }) => {
  return (
    <PackStyle className="border my-2 py-2 rounded-3 flex-fill mx-2">
      <div className=" d-flex align-items-center flex-wrap justify-content-end">
        <div className="d-flex me-auto flex-shrink-1 align-items-center ">
          <Img src={`${pack.picture}`} forChange={forChange} />
          <Form.Text className="me-2 my-0 fs-6 fw-bold" rows="2">
            {pack.name}
          </Form.Text>
        </div>
        <div className="mx-2 my-auto text-nowrap">
          Вес упаковки - {pack.weight1} г.
        </div>
        <div className="mx-2 my-auto text-nowrap">
          Вместительность - {pack.giftWeight} г.
        </div>
        <div className="mx-2 my-auto text-nowrap">
          Цена - {pack.price1} руб.
        </div>
      </div>
    </PackStyle>
  );
};
