import styled from 'styled-components';
import { Advances } from '../components/Advances';
import { MainCarousel } from '../components/MainCarousel';

const HomeStyle = styled.div`
  padding-top: 40px 0;
`;

export const HomePage = () => {
  return (
    <>
      <MainCarousel />
      <Advances />
    </>
  );
};
