import { useParams } from 'react-router-dom';
import { getRequest, postRequest } from '../services/serverRequest';
import { LoginContext } from '../App';
import { useContext, useEffect, useState } from 'react';
import { ErrorComp } from '../components/ErrorComp';
import { Form, Button, Row, Col, Container } from 'react-bootstrap';
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
          <Form onSubmit={handleSaveForm}>
            <Container>
              <Row className="my-2 flex-wrap">
                <Col className="d-flex text-start col-6">
                  e-mail, с которого будут отправляться сообщения:
                </Col>
                <Col className="col-6">
                  <Form.Control
                    value={adminData.email}
                    onChange={(e) =>
                      setAdminData((adminData) => ({
                        ...adminData,
                        email: e.target.value,
                      }))
                    }
                  />
                </Col>
              </Row>
              <Row className="d-flex form-group my-2">
                <Col className="d-flex text-nowrap ms-auto col-6">Пароль: </Col>
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
              </Row>
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
            </Container>
          </Form>
        </div>
      )}
    </StyleChangePassPage>
  );
};
