import styled from 'styled-components';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { PrivateRoutes } from './PrivateRoutes';
import { LoginPage } from './pages/LoginPage';
import { NotFound } from './pages/NotFound';
import { useState, useEffect, createContext } from 'react';

export const LoginContext = createContext();

const AppStyle = styled.div`
  font-family: 'Montserrat';
  .col {
    text-align: center;
    border: 1px grey solid;
  }
`;

export const App = () => {
  const [auth, setAuth] = useState({
    isLogged: false,
    token: '',
    authCode: true,
  });
  useEffect(() => setAuth(true), []);
  let authCodeFromLS = true;
  return (
    <AppStyle>
      <LoginContext.Provider value={{ auth, setAuth }}>
        <BrowserRouter>
          <Routes>
            <Route element={<PrivateRoutes auth={auth} />}>
              <Route path="/" element={<HomePage />} />
            </Route>
            <Route
              path="/login"
              element={<LoginPage authCodeFromLS={authCodeFromLS} />}
            />
            <Route path="/*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </LoginContext.Provider>
    </AppStyle>
  );
};
