import { Row } from 'react-bootstrap';

export const Good = (good) => {
  return (
    <Row className="good">
      <p>{good.Наименование}</p>
      <p>{good['Цена 1 конф.']}</p>
    </Row>
  );
};
