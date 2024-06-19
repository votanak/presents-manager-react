import { Card } from 'react-bootstrap';
import styled from 'styled-components';

const GiftCardStyle = styled(Card)`
  border-radius: 15px;
  width: 400px;
  height: 300px;
  display: flex;
  flex-direction: row;
  border: 4px solid #57a7eb;
  padding: 20px;
  transition: all 500ms;
  * {
    transition: all 500ms;
  }
  * a {
    text-decoration: none;
    color: black;
  }
  img {
    width: 100%;
  }
  .gift-name {
    display: flex;
    align-items: center;
    text-decoration: none;
    vertical-align: middle;
    background: linear-gradient(45deg, #30df6e, #62a8ff);
    font-size: 20px;
    color: #fff;
    padding: 0px 20px;
    margin-top: 15px;
    margin-left: -20px;
    margin-bottom: 20px;
    border-top-right-radius: 20px;
    border-bottom-right-radius: 20px;
    text-aligh: left;
    height: 120px;
    font-weight: bold;
    vertical-alignment: middle;
  }
  .text-container {
    width: 50%;
  }
  .img-container {
    width: 50%;
  }
  .more {
    font-family: Montserrat;
    font-size: 16px;
    background-color: #eee;
    border-radius: 15px;
    padding: 5px 15px;
    width: 130px;
    color: black;
    &:hover {
      background-color: black;
    }
    &:hover a {
      color: white;
    }
  }

  &:hover {
    border-color: #7557eb;
  }
  &:hover .text-container .gift-name {
    height: 50%;
  }
  &:hover .text-container .gift-name a {
    color: #00f;
  }
`;

export const GiftCard = ({ giftParams }) => {
  return (
    <GiftCardStyle>
      <div className="text-container">
        <div className="gift-name" style={{ background: giftParams.textBg }}>
          <a href="">{giftParams.giftName}</a>
        </div>
        <div className="gift-price fs-4 mb-4">
          от <strong>{giftParams.giftPrice}</strong> руб.
        </div>
        <div className="more">
          <a href="">Подробнее</a>
        </div>
      </div>
      <div className="img-container">
        <a href="">
          <img src={giftParams.giftPicture} alt="" className="giftImage" />
        </a>
      </div>
    </GiftCardStyle>
  );
};
