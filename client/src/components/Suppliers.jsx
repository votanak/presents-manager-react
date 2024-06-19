import styled from 'styled-components';
import Flickity from 'react-flickity-component';
import 'flickity/css/flickity.css';

const SuppliersStyle = styled.div`
  margin: 80px;
  .adv-container img {
    margin: 0 30px;
    border-radius: 10px;
  }
  .head-suppliers {
    margin-bottom: 20px;
  }
`;

const flickityOptions = {
  cellAlign: 'left',
  contain: true,
  autoPlay: true,
  wrapAround: true,
};
export const Suppliers = () => {
  const suppliersPic = [
    { link: '/pic/image-1.png' },
    { link: '/pic/image-2.png' },
    { link: '/pic/image-3.png' },
    { link: '/pic/image-4.png' },
    { link: '/pic/image-5.png' },
    { link: '/pic/image-6.png' },
    { link: '/pic/image-7.png' },
    { link: '/pic/image-8.png' },
    { link: '/pic/image-9.png' },
  ];
  return (
    <SuppliersStyle>
      <h1 className="head-suppliers">Наши поставщики</h1>
      <Flickity
        className={'carousel'}
        elementType={'div'}
        options={flickityOptions}
        disableImagesLoaded={false}
        reloadOnUpdate
        static
      >
        {suppliersPic.map((el, ind) => (
          <div className="carousel-cell adv-container" key={ind}>
            <img src={el.link} alt="adv-img" height="100px" />
          </div>
        ))}
      </Flickity>
    </SuppliersStyle>
  );
};
