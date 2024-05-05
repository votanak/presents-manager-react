import styled from 'styled-components';
import { useContext, useState } from 'react';
import { LoginContext } from '../App';
import { postRequest } from '../services/serverRequest';
import { Form, Button, InputGroup } from 'react-bootstrap';
import { Navigate, useNavigate } from 'react-router-dom';

const LoginPageStyle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 60svh;
  & p {
    font-size: 30px;
    font-weight: normal;
    margin-top: 25px;
  }
  #change-pass-ref {
    position: fixed;
    bottom: 0;
    right: 0;
    cursor: pointer;
    margin: 20px;
  }
`;

export const LoginPage = () => {
  const { auth, setAuth } = useContext(LoginContext);
  const [loginParams, setLoginParams] = useState({
    email: '',
    password: '',
  });
  const navigate = useNavigate();

  const handlePassChangeEmail = async (e) => {
    postRequest('/send_change_email', auth.token, {})
      .then(() => {
        alert(
          `На Email администратора отправлена ссылка для смены пароля. Срок годности ссылки - 1 час`,
        );
      })
      .catch((err) => {
        alert('неудачная отправка email!!!');
        throw err;
      });
  };

  const formHandle = async (e) => {
    e.preventDefault();
    await postRequest('/login', auth.token, loginParams)
      .then(({ data }) => {
        setAuth({
          authCode: data.authCode,
          isLogged: true,
          token: data.accessToken,
        });
        localStorage.setItem('authCode', data.authCode);
        navigate('/adminpage');
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const inputChangeHandler = (e) => {
    setLoginParams({ ...loginParams, [e.target.name]: e.target.value });
  };

  return (
    <div>
      {!auth.authCode ? (
        <LoginPageStyle>
          <p>Вход администратора</p>
          <Form onSubmit={formHandle}>
            <InputGroup>
              <Form.Control
                name="email"
                type="email"
                placeholder="e-mail"
                onChange={inputChangeHandler}
                required={true}
                value={loginParams.email}
                autoFocus={true}
                className="me-2"
              />
              <Form.Control
                name="password"
                placeholder="Password"
                onChange={inputChangeHandler}
                required={true}
                value={loginParams.password}
                type="password"
              />
              <Button type="submit" onClick={formHandle} className="mx-2">
                Войти
              </Button>
            </InputGroup>
          </Form>
          <div onClick={handlePassChangeEmail} id="change-pass-ref">
            Смена пароля
          </div>
        </LoginPageStyle>
      ) : (
        <>{auth.isLogged && <Navigate to="/" />}</>
      )}
    </div>
  );
};
