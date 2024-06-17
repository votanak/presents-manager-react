import styled from "styled-components";

export const FlickityCarousel = () => {

   const FlickityStyle = styled(Flickity)`
    .carousel-cell {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 30px;
    width: 95%;
    background-color: white;
    border-radius: 10px;
    width: 300px;
    margin-right: 10px;
  }
   `

  return <>
        <FlickityStyle
        className={'carousel'} // default ''
        elementType={'div'} // default 'div'
        options={flickityOptions} // takes flickity options {}
        disableImagesLoaded={false} // default false
        reloadOnUpdate // default false
        static // default false
      >
        {advances.map((el, ind) => (
          <div className="carousel-cell adv-container" key={ind}>
            <img src="/pic/advance-pic.png" alt="adv-img" width="60px" />
            <div className="fw-bold mt-2">{el.header}</div>
            {el.texts.map((el1, ind1) => (
              <div key={ind1} className="mt-2">
                {el1}
              </div>
            ))}
          </div>
        ))}
      </FlickityStyle>

  </>;
};
