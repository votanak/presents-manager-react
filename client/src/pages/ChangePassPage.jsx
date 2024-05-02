import { useParams } from 'react-router-dom';

export const ChangePassPage = () => {
  const changePassUuid = useParams();

  return (
    <div>
      <div>Страница изменения данных администратора</div>
      <div>Будьте внимательны</div>
      <div>Будьте внимательны</div>
    </div>
  );
};
