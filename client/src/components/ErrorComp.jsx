import { Link } from 'react-router-dom';

export const ErrorComp = ({ errText }) => {
  return (
    <>
      <div>Ошибка</div>
      <div>{errText}</div>
      <Link to="/">Перейти на главную страницу</Link>
    </>
  );
};
