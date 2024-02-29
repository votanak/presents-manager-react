import styled from 'styled-components';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { PrivateRoutes } from './PrivateRoutes';
import { LoginPage } from './pages/LoginPage';
import { NotFound } from './pages/NotFound';
import { useState, useEffect, createContext } from 'react';
import { AdminPage } from './pages/AdminPage';

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
    authCode: localStorage.getItem('authCode'),
  });
  useEffect(() => setAuth(true), []);
  const authCodeFromLS = localStorage.getItem('authCode');
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
            <Route path="/AdminPage" element={<AdminPage />} />
            <Route path="/*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </LoginContext.Provider>
    </AppStyle>
  );
};
