import styled from 'styled-components';
import { Advances } from '../components/Advances';
import { MainCarousel } from '../components/MainCarousel';
import { CatalogCards } from '../components/CatalogCards';
import { Footer } from '../components/Footer';
import { Suppliers } from '../components/Suppliers';

const HomeStyle = styled.div`
  padding: 50px 0;
`;

export const HomePage = () => {
  return (
    <HomeStyle>
      <MainCarousel />
      <Advances />
      <CatalogCards />
      <Suppliers />
      <Footer />
    </HomeStyle>
  );
};
