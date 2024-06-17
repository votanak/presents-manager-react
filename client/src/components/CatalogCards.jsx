import styled from 'styled-components';
import { GiftCard } from './GiftCard';
import { Row, Col } from 'react-bootstrap';

const CatalogCardsStyle = styled(Row)`
  .col {
    min-width: 300px;
  }
`;

export const CatalogCards = () => {
  const giftData = [
    {
      giftName: 'Подарки в упаковке из картона',
      giftPicture: '/pic/group-1.png',
      giftPrice: 150,
    },
    {
      giftName: 'Подарки в жестяной упаковке и в тубе',
      giftPicture: '/pic/group-2.png',
      giftPrice: 150,
    },
    {
      giftName: 'Подарки в текстильной упаковке',
      giftPicture: '/pic/group-3.png',
      giftPrice: 150,
    },
    {
      giftName: 'Подарки в упаковке из дерева',
      giftPicture: '/pic/group-4.png',
      giftPrice: 150,
    },
    {
      giftName: 'Подарки для детсадов и школ',
      giftPicture: '/pic/group-5.jpg',
      giftPrice: 150,
    },
  ];

  return (
    <>
      <div className="cat-name">Каталог подарков</div>
      <Row>
        {giftData.map((el, ind) => (
          <Col>
            <GiftCard giftParams={el} key={ind} />
          </Col>
        ))}
      </Row>
    </>
  );
};
