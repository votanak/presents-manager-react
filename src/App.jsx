import styled from 'styled-components';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { PrivateRoutes } from './PrivateRoutes';
import { LoginPage } from './pages/LoginPage';
import { NotFound } from './pages/NotFound';
import { useState, createContext } from 'react';
import { AdminPage } from './pages/AdminPage';

export const LoginContext = createContext();

const AppStyle = styled.div`
  font-family: 'Montserrat';
`;

export const App = () => {
  const [auth, setAuth] = useState({
    isLogged: false,
    token: '',
    authCode: '',
  });
  const authCodeFromLS = '';
  return (
    <AppStyle>
      <LoginContext.Provider value={{ auth, setAuth }}>
        <BrowserRouter>
          <Routes>
            <Route element={<PrivateRoutes auth={auth} />}>
              <Route
                path="/adminpage"
                element={<AdminPage authCodeFromLS={authCodeFromLS} />}
              />
            </Route>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </LoginContext.Provider>
    </AppStyle>
  );
};
