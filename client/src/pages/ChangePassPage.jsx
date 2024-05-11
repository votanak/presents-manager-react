import { useParams } from 'react-router-dom';
import { getRequest, postRequest } from '../services/serverRequest';
import { useEffect, useState } from 'react';
import { ErrorComp } from '../components/ErrorComp';
import { Form, Button, Container } from 'react-bootstrap';
import styled from 'styled-components';

const StyleChangePassPage = styled.div`
  * {
    align-items: center;
  }
  .form-label {
    margin: 0 0;
  }
  input {
    max-width: 270px;
  }
`;

export const ChangePassPage = () => {
  const { changePassUuid } = useParams();
  const [errText, setErrText] = useState('');
  const [adminData, setAdminData] = useState({
    email: '',
    orderEmail: '',
    password: '',
    passApprove: '',
    passApp: '',
  });
  const [promptToSave, setPromptToSave] = useState(false);
  const [isFormValid, setIsFormValid] = useState({
    email: true,
    orderEmail: true,
    password: false,
    passApprove: false,
    passApp: true,
  });
  const isPassEqual = adminData.password === adminData.passApprove;
  const formIsValid =
    isFormValid.email &&
    isFormValid.orderEmail &&
    isFormValid.password &&
    isFormValid.passApprove &&
    isFormValid.passApp &&
    isPassEqual;

  useEffect(() => {
    getRequest(`/get_admin_data/${changePassUuid}`, '', {}).then(({ data }) => {
      !data.response
        ? setErrText(
            'Срок данного запроса на изменение парамтеров учётной записи истёк или запрос не существует',
          )
        : setAdminData({ ...data.response, password: '', passApprove: '' });
    });
  }, [changePassUuid]);

  const handleSaveForm = async (e) => {
    e.preventDefault();
    setPromptToSave(true);
    try {
      if (!isFormValid) return;
      const { passApprove: _, ...aData } = adminData;
      await postRequest('/write_admin_data', '', {
        passUuid: changePassUuid,
        aData,
      });
      alert('данные успешно записаны');
      window.close();
    } catch (error) {
      throw error;
    }
  };

  const handlerChange = (e) => {
    let regExp = '';
    switch (e.target.name) {
      case 'email':
      case 'orderEmail':
        regExp = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
        break;
      case 'password':
      case 'passApprove':
        regExp = /^.{3,16}$/;
        break;
      default:
        break;
    }
    console.log(e.target.name, regExp, Boolean(e.target.value.match(regExp)));
    if (!!regExp) {
      setIsFormValid((isFormValid) => ({
        ...isFormValid,
        [e.target.name]: Boolean(e.target.value.match(regExp)),
      }));
    }
    setAdminData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  console.log(isFormValid);
  console.log('adminData: ', adminData);

  return (
    <StyleChangePassPage>
      {errText ? (
        <ErrorComp errText={errText} />
      ) : (
        <div className="">
          <div className="d-flex mt-4 fs-4 justify-content-center">
            Страница изменения данных администратора
          </div>
          <Form onSubmit={handleSaveForm}>
            <Container>
              <Form.Group className="d-block d-lg-flex my-2">
                <div className="text-start me-2 w-50">
                  e-mail, с которого будут отправляться сообщения:
                </div>
                <div className="w-50">
                  <Form.Control
                    name="email"
                    value={adminData.email}
                    onChange={handlerChange}
                    autoComplete="off"
                    isInvalid={promptToSave && !isFormValid.email}
                  />
                  <Form.Control.Feedback type="invalid">
                    введите правильный e-mail
                  </Form.Control.Feedback>
                </div>
              </Form.Group>
              <Form.Group className="d-block d-lg-flex my-2">
                <div className="text-start me-2 w-50">Пароль: </div>
                <div className="w-50">
                  <Form.Control
                    name="password"
                    value={adminData.password}
                    type="password"
                    onChange={handlerChange}
                    autoComplete="new-password"
                    isInvalid={promptToSave && !isFormValid.password}
                  />
                  <Form.Control.Feedback type="invalid">
                    {!isFormValid.password &&
                      'длина пароля от 3 до 16 символов'}
                  </Form.Control.Feedback>
                </div>
              </Form.Group>
              <Form.Group className="d-block d-lg-flex my-2">
                <div className="text-start me-2 w-50">
                  Подтверждение пароля:
                </div>
                <div className="w-50">
                  <Form.Control
                    name="passApprove"
                    value={adminData.passApprove}
                    type="password"
                    onChange={handlerChange}
                    isInvalid={
                      promptToSave && (!isFormValid.passApprove || !isPassEqual)
                    }
                  />
                  <Form.Control.Feedback type="invalid">
                    {!isPassEqual && <div>Пароли не равны</div>}
                    {!isFormValid.passApprove && (
                      <div>длина пароля от 3 до 16 символов</div>
                    )}
                  </Form.Control.Feedback>
                </div>
              </Form.Group>
              <Form.Group className="d-block d-lg-flex my-2">
                <div className="text-start me-2 w-50">Пароль приложения:</div>
                <div className="w-50">
                  <Form.Control
                    name="passApp"
                    value={adminData.passApp}
                    onChange={handlerChange}
                    isInvalid={promptToSave && !isFormValid.passApp}
                  />
                  <Form.Control.Feedback type="invalid">
                    Поле не должно быть пустым
                  </Form.Control.Feedback>
                </div>
              </Form.Group>
              <div className="d-block d-lg-flex my-2">
                <div className="text-start me-2 w-50">
                  Ваш e-mail, на который будут приходить сообщения:
                </div>
                <div className="w-50">
                  <Form.Control
                    name="orderEmail"
                    type="email"
                    value={adminData.orderEmail}
                    onChange={handlerChange}
                    isInvalid={promptToSave && !isFormValid.orderEmail}
                  />
                  <Form.Control.Feedback type="invalid">
                    введите правильный e-mail
                  </Form.Control.Feedback>
                </div>
              </div>
              <Button
                type="submit"
                className="mt-4"
                disabled={promptToSave && !formIsValid}
              >
                Сохранить
              </Button>
            </Container>
          </Form>
        </div>
      )}
    </StyleChangePassPage>
  );
};
