import { Card, Container } from 'react-bootstrap';
import styled from 'styled-components';

const GiftCardStyle = styled(Card)`
  border-radius: 15px;
  max-width: 300px;
  img {
    width: 150px;
  }
`;

export const GiftCard = ({ giftParams }) => {
  console.log(giftParams);
  return (
    <GiftCardStyle>
      <div className="giftName">{giftParams.giftName}</div>
      <img src={giftParams.giftPicture} alt="" className="giftImage" />
      <div className="gift-price">{giftParams.giftPrice}</div>
    </GiftCardStyle>
  );
};
