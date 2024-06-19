import 'pure-react-carousel/dist/react-carousel.es.css';
import styled from 'styled-components';
import Flickity from 'react-flickity-component';
import 'flickity/css/flickity.css';

const AdvancesStyle = styled.div`
  padding: 40px;
  @media (min-width: 992px) {
    width: 80%;
  }
  margin: 0 auto;
  background: rgba(255, 255, 255, 0) .advance-text {
    text-align: center;
    margin-bottom: 10px;
  }
  .head-advances {
    margin-bottom: 20px;
  }
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
`;

export const Advances = () => {
  const advances = [
    {
      header: 'Лучшая цена',
      texts: [
        'Фиксация цены на момент предоплаты, даже если сырьё подорожает и поставщики поднимут цены, для вас они останутся прежними.',
      ],
    },
    {
      header: 'Доставка и хранение подарков',
      texts: [
        'Мы исполняем свои обязательства точно в срок, благодаря развитой логистике и планированию доставок',
        'Упаковывать сладкие новогодние подарки мы начинаем в ноябре, а доставлять ближе к празднику, обеспечивая бесплатное хранение с надлежащим температурным режимом.',
      ],
    },
    {
      header: 'Чем мы отличаемся от других?',
      texts: [
        'Важным нашим конкурентным преимуществом является индивидуальный подход к каждому клиенту.',
        'Наряду с предложениями из прайса – мы готовы собрать уникальный подарок под пожелания конкретного клиента из любых конфет и в любую упаковку.',
        'Вы сами выбираете, какие конфеты и в каком оформлении получат Ваши дети!',
      ],
    },
    {
      header: 'Честный подход',
      texts: [
        'Готовый заказ тщательно проверяем на соответствие калькуляции,',
        'Вы можете быть уверены, что получите то, что заказывали.',
        'Калькуляция Вашего подарка всегда является обязательным приложением к договору.',
      ],
    },
    {
      header: 'Качество подарков',
      texts: [
        'Качество всей нашей продукции подтверждается сертификатами соответствия от производителей.',
        'Мы сотрудничаем только с проверенными и зарекомендовавшими себя поставщиками.',
        'Мы профессионально занимаемся новогодними подарками и не торгуем конфетами в течение года, что гарантирует свежесть конфет!',
        'Мы не закупаем конфеты, произведенные летом, а получаем первые партии в начале октября.',
        'У нас нет ни одного готового подарка! Все подарки собираются только после подписания договора.',
      ],
    },
  ];

  const flickityOptions = {
    cellAlign: 'left',
    contain: true,
    autoPlay: true,
    wrapAround: true,
  };

  return (
    <AdvancesStyle>
      <h1 className="head-advances">Наши преимущества</h1>
      <Flickity
        className={'carousel'}
        elementType={'div'}
        options={flickityOptions}
        disableImagesLoaded={false}
        reloadOnUpdate
        static
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
      </Flickity>
    </AdvancesStyle>
  );
};
