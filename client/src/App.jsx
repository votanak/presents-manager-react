import styled from 'styled-components';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { PrivateRoutes } from './PrivateRoutes';
import { LoginPage } from './pages/LoginPage';
import { NotFound } from './pages/NotFound';
import { useState, createContext, useEffect } from 'react';
import { AdminPage } from './pages/AdminPage';
import { getRequest, postRequest } from './services/serverRequest';

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
  const [priceArray, setPriceArray] = useState();
  const [packArray, setPackArray] = useState();
  const [upd, setUpd] = useState(0);
  const authCodeFromLS = localStorage.getItem('authCode');

  useEffect(() => {
    if (!authCodeFromLS) return;
    postRequest('/get_token_silently', auth.token, {
      authCode: authCodeFromLS,
    })
      .then((response) => {
        if ('error' in response) throw new Error(response.error);

        setAuth({
          authCode: authCodeFromLS,
          isLogged: true,
          token: response.data.accessToken,
        });
      })
      .catch(() => {
        localStorage.removeItem('authCode');
        setAuth({
          authCode: '',
          isLogged: false,
          token: '',
        });
      });
  }, [auth.token, authCodeFromLS]);

  useEffect(() => {
    getRequest('/get_json', '', { filename: 'priceArray' }).then((data) =>
      setPriceArray(data),
    );
    getRequest('/get_json', '', { filename: 'packArray' }).then((data) =>
      setPackArray(data),
    );
  }, []);

  return (
    <AppStyle>
      <LoginContext.Provider value={{ auth, setAuth }}>
        <PriceContext.Provider
          value={{
            priceArray,
            setPriceArray,
            packArray,
            setPackArray,
            upd,
            setUpd,
          }}
        >
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
