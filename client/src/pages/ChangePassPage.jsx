import { useParams } from 'react-router-dom';
import { getRequest, postRequest } from '../services/serverRequest';
import { LoginContext } from '../App';
import { useContext, useEffect, useState } from 'react';
import { ErrorComp } from '../components/ErrorComp';
import { Form, Button } from 'react-bootstrap';
import styled from 'styled-components';

const StyleChangePassPage = styled.div`
  * {
    align-items: center;
  }
  .form-label {
    margin: 0 0;
  }
  .form-group {
    margin: 10px 5px;
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
  useEffect(() => {
    getRequest(`/check_pass_uuid/${changePassUuid}`, auth.token, {}).then(
      ({ data }) => {
        !data.response
          ? setErrText(
              'Срок данного запроса на изменение парамтеров учётной записи истёк или запрос не существует',
            )
          : getRequest('/get_admin_data', auth.token, {}).then(({ data }) => {
              setAdminData(data);
              console.log(data);
            });
      },
    );
  }, [auth.token, changePassUuid]);

  const handleSaveForm = () => {
    postRequest('/write-admin-data', auth.token, adminData);
  };

  return (
    <StyleChangePassPage>
      {errText ? (
        <ErrorComp errText={errText} />
      ) : (
        <div className="">
          <div className="d-flex mt-4 fs-4 justify-content-center">
            Страница изменения данных администратора
          </div>
          <Form onSubmit={handleSaveForm} className="w-75 mx-auto text-center">
            <Form.Group className="d-flex form-group">
              <Form.Label className="d-flex text-nowrap">
                e-mail, с которого будут отправляться сообщения:
              </Form.Label>
              <Form.Control
                value={adminData.email}
                onChange={(e) =>
                  setAdminData((adminData) => ({
                    ...adminData,
                    email: e.target.value,
                  }))
                }
              />
            </Form.Group>
            <Form.Group className="d-flex form-group">
              <Form.Label className="d-flex text-nowrap">Пароль: </Form.Label>
              <Form.Control
                value={adminData.email}
                type="password"
                onChange={(e) =>
                  setAdminData((adminData) => ({
                    ...adminData,
                    email: e.target.value,
                  }))
                }
              />
            </Form.Group>
            <Form.Group className="d-flex form-group">
              <Form.Label className="d-flex text-nowrap">
                Пароль приложения:
              </Form.Label>
              <Form.Control
                value={adminData.email}
                onChange={(e) =>
                  setAdminData((adminData) => ({
                    ...adminData,
                    email: e.target.value,
                  }))
                }
              />
            </Form.Group>
            <Form.Group className="d-flex form-group">
              <Form.Label className="d-flex text-nowrap">
                Ваш e-mail, на который будут приходить сообщения:
              </Form.Label>
              <Form.Control
                type="email"
                value={adminData.email}
                onChange={(e) =>
                  setAdminData((adminData) => ({
                    ...adminData,
                    email: e.target.value,
                  }))
                }
              />
            </Form.Group>
            <Button type="submit" className="mt-4">
              Сохранить
            </Button>
          </Form>
        </div>
      )}
    </StyleChangePassPage>
  );
};
