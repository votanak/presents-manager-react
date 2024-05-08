import { useParams } from 'react-router-dom';
import { getRequest } from '../services/serverRequest';
import { LoginContext } from '../App';
import { useContext, useEffect, useState } from 'react';
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
  const { auth } = useContext(LoginContext);
  const [errText, setErrText] = useState('');
  const [adminData, setAdminData] = useState({});
  const [isFormValid, setIsFormValid] = useState({
    email: true,
    orderEmail: true,
    password: false,
    passApprove: false,
    isPassEqual: true,
  });

  useEffect(() => {
    getRequest(`/check_pass_uuid/${changePassUuid}`, auth.token, {}).then(
      ({ data }) => {
        !data.response
          ? setErrText(
              'Срок данного запроса на изменение парамтеров учётной записи истёк или запрос не существует',
            )
          : getRequest('/get_admin_data', auth.token, {}).then(({ data }) => {
              setAdminData({ ...data, passApprove: '', password: '' });
            });
      },
    );
  }, [auth.token, changePassUuid]);

  const [promptToSave, setPromptToSave] = useState(false);

  const formIsValid =
    isFormValid.email && isFormValid.orderEmail && isFormValid.isPassEqual;

  console.log(
    Object.values(isFormValid).length &&
      Object.values(isFormValid).reduce((a, e) => a + +e, 0),
  );

  const handleSaveForm = (e) => {
    if (!formIsValid) {
      e.preventDefault();
      setPromptToSave(true);
      console.log(isFormValid);
      return;
    }
    try {
      if (!isFormValid) return;
      // const { passApprove: _, ...rest } = adminData;
      // postRequest('/write-admin-data', auth.token, rest);
      console.log('form successfully saved');
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
        regExp = /^.{3,12}$/;
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
    setAdminData({ ...adminData, [e.target.name]: e.target.value });
    setIsFormValid((isFormValid) => ({
      ...isFormValid,
      isPassEqual: adminData.password === adminData.passApprove,
    }));
  };

  console.log(isFormValid);
  console.log(adminData);
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
                    isInvalid={promptToSave && !isFormValid.email}
                  />
                  <Form.Control.Feedback tooltip type="invalid">
                    введите правильный e-mail
                  </Form.Control.Feedback>
                </div>
              </Form.Group>
              <Form.Group className="d-block d-lg-flex my-2">
                <div className="text-start me-2 w-50">Пароль: </div>
                <Form.Control
                  name="password"
                  value={adminData.password}
                  type="password"
                  onChange={handlerChange}
                  isInvalid={promptToSave && !isFormValid.pass}
                />
                <Form.Control.Feedback tooltip type="invalid">
                  пароль от 3 до 12 символов
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="d-block d-lg-flex my-2">
                <div className="text-start me-2 w-50">
                  Подтверждение пароля:
                </div>
                <Form.Control
                  name="passApprove"
                  value={adminData.passApprove}
                  type="password"
                  onChange={handlerChange}
                  isInvalid={promptToSave && !isFormValid.pass}
                />
                <Form.Control.Feedback tooltip type="invalid">
                  пароли должны совпадать
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="d-block d-lg-flex my-2">
                <div className="text-start me-2 w-50">Пароль приложения:</div>
                <Form.Control
                  name="passApp"
                  value={adminData.passApp}
                  onChange={handlerChange}
                />
                <Form.Control.Feedback tooltip type="invalid">
                  введите правильный e-mail
                </Form.Control.Feedback>
              </Form.Group>
              <div className="d-block d-lg-flex my-2">
                <div className="text-start me-2 w-50">
                  Ваш e-mail, на который будут приходить сообщения:
                </div>
                <Form.Control
                  name="orderEmail"
                  type="email"
                  value={adminData.orderEmail}
                  onChange={handlerChange}
                  isInvalid={promptToSave && !isFormValid.orderEmail}
                />
                <Form.Control.Feedback tooltip type="invalid">
                  введите правильный e-mail
                </Form.Control.Feedback>
              </div>
              <Button type="submit" className="mt-4">
                Сохранить
              </Button>
            </Container>
          </Form>
        </div>
      )}
    </StyleChangePassPage>
  );
};
