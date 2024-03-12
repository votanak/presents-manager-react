import { Link } from 'react-router-dom';
import styled from 'styled-components';

const NotFoundStyle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 70vh;
`;

export const NotFound = () => {
  return (
    <NotFoundStyle>
      <h1>
        Page Not Found. Let&apos;s go to the{' '}
        <Link to="/">Конструктор подарков ГК "Конфи"</Link>
      </h1>
    </NotFoundStyle>
  );
};
