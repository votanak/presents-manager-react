import styled from 'styled-components';
import { GiftCard } from './GiftCard';
import { Row, Col, Container } from 'react-bootstrap';

const CatalogCardsStyle = styled(Container)`
  .col {
  }
  .row {
    justify-content: center;
  }
`;

export const CatalogCards = () => {
  const giftData = [
    {
      giftName: 'Подарки в упаковке из картона',
      giftPicture: '/pic/group-1.png',
      giftPrice: 150,
      textBg: 'linear-gradient(45deg, #30df6e, #62a8ff)',
    },
    {
      giftName: 'Подарки в жестяной упаковке и в тубе',
      giftPicture: '/pic/group-2.png',
      giftPrice: 150,
      textBg: 'linear-gradient(45deg, #df3071, #62a8ff)',
    },
    {
      giftName: 'Подарки в текстильной упаковке',
      giftPicture: '/pic/group-3.png',
      giftPrice: 150,
      textBg: 'linear-gradient(45deg, #dfa130, #ff627f)',
    },
    {
      giftName: 'Подарки в упаковке из дерева',
      giftPicture: '/pic/group-4.png',
      giftPrice: 150,
      textBg: 'linear-gradient(45deg, #30dfbf, #ff627f)',
    },
    {
      giftName: 'Подарки для детсадов и школ',
      giftPicture: '/pic/group-5.jpg',
      giftPrice: 150,
      textBg: 'linear-gradient(45deg, #30df6e, #62a8ff)',
    },
  ];

  return (
    <CatalogCardsStyle>
      <h1 className="mt-4 mb-2">Каталог подарков</h1>
      <Row>
        {giftData.map((el, ind) => (
          <div className="d-flex p-2 w-auto" key={ind}>
            <GiftCard giftParams={el} />
          </div>
        ))}
      </Row>
    </CatalogCardsStyle>
  );
};
