import { Carousel } from 'react-bootstrap';
import styled from 'styled-components';

const MainCarouselStyle = styled(Carousel)`
  .carousel-inner {
    height: 700px;
  }
  .carousel-img-container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-width: 100%;
    height: 100%;
  }
  .carousel-item {
    width: 100%;
    height: 100%;
  }
  .carousel-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .carousel-caption {
    position: absolute;
    top: 40%;
    display: flex;
    flex-direction: column;
    align-items: center;
    color: black;
  }
  .caption {
    background: rgba(255, 255, 255, 0.5);
    padding: 40px;
    border-radius: 10px;
  }
  p {
    font-family: Montserrat;
  }
`;

export const MainCarousel = () => {
  return (
    <MainCarouselStyle>
      <Carousel.Item>
        <div className="carousel-img-container">
          <img
            src="/pic/carousel-01.jpg"
            alt="first-slide"
            className="carousel-image"
          />
        </div>
        <Carousel.Caption>
          <div className="caption">
            <h2>ГК "Конфи"</h2>
            <p className="fs-5">Изготовление и продажа детских подарков</p>
          </div>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <div className="carousel-img-container">
          <img
            src="/pic/carousel-02.jpg"
            alt="second-slide"
            className="carousel-image"
          />
        </div>
        <Carousel.Caption>
          <div className="caption">
            <h3>ГК "Конфи"</h3>
            <p className="fs-5">Изготовление и продажа детских подарков</p>
          </div>
        </Carousel.Caption>
      </Carousel.Item>
    </MainCarouselStyle>
  );
};
