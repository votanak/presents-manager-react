import styled from 'styled-components';
import { Advances } from '../components/Advances';
import { MainCarousel } from '../components/MainCarousel';
import { CatalogCards } from '../components/CatalogCards';

const HomeStyle = styled.div`
  padding: 50px 0;
`;

export const HomePage = () => {
  return (
    <HomeStyle>
      <MainCarousel />
      <Advances />
      <CatalogCards />
    </HomeStyle>
  );
};
