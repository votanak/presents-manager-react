import loadImg from '../img/load.svg';
import styled from 'styled-components';

const LoaderStyle = styled.div`
  display: flex;
  height: auto;
  justify-content: center;
  align-items: center;
`;

export const Loader = () => (
  <LoaderStyle>
    <img src={loadImg} alt="" />
  </LoaderStyle>
);
