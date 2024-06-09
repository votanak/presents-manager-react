import { PriceList } from '../components/PriceList';

export const MakeGift = () => {
  return (
    <>
      <p className="mx-auto fw-bold fs-5 text-center my-2 ">
        Соберите свой уникальный подарок
      </p>
      <PriceList forchange={false} />
    </>
  );
};
