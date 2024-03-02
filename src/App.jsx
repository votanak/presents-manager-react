import styled from 'styled-components';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { PrivateRoutes } from './PrivateRoutes';
import { LoginPage } from './pages/LoginPage';
import { NotFound } from './pages/NotFound';
import { useState, createContext, useEffect } from 'react';
import { AdminPage } from './pages/AdminPage';
import { getRequest } from './services/serverRequest';

export const LoginContext = createContext();
export const PriceContext = createContext();

const AppStyle = styled.div`
  font-family: 'Montserrat';
`;

export const App = () => {
  const [auth, setAuth] = useState({
    isLogged: false,
    token: '',
    authCode: '',
  });
  const [priceObject, setPriceObject] = useState();
  useEffect(() => {
    getRequest('/get_price', '', {});
  }, [auth]);

  const authCodeFromLS = '';
  return (
    <AppStyle>
      <LoginContext.Provider value={{ auth, setAuth }}>
        <PriceContext.Provider value={{ priceObject, setPriceObject }}>
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
        </PriceContext.Provider>
      </LoginContext.Provider>
    </AppStyle>
  );
};
