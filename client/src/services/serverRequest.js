import queryString from 'query-string';
import { priceArray } from './priceArray';

const serverResponse = async (response) =>
  new Promise((resolve) => {
    setTimeout(() => resolve(response), 1000);
  });

export const request = async (url, method, token, params) => {
  switch (url) {
    case '/login':
      if (method === 'POST') {
        const data = await serverResponse({
          data: {
            accessToken:
              'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFubmFAZXhhbXBsZS5jb20iLCJyb2xlIjoibWVtYmVyIiwiaWF0IjoxNzA5MTU0ODE2fQ.or5xQVg0h_v58UJ5WW0O3O89i7JnmeDgP-lqagW3m3U',
            authCode: 'dfe1be2a-4b41-4d21-82df-2a32dceccd6d',
          },
        });
        return data;
      }
      break;
    case '/get_price?':
      const data = await serverResponse(priceArray);
      return data;

    case '/send_order':
      try {
        const response = await fetch(
          `${process.env.REACT_APP_SERVER_URL}${url}`,
          {
            method,
            headers: {
              'Content-Type': 'application/json',
            },
            ...(method === 'POST' ? params : {}),
          },
        );
        return response.json();
      } catch (e) {
        return e;
      }

    case '/write_array':
      try {
        const response = await fetch(
          `${process.env.REACT_APP_SERVER_URL}${url}`,
          {
            method,
            headers: {
              'Content-Type': 'application/json',
            },
            ...(method === 'POST' ? params : {}),
          },
        );
        return response.json();
      } catch (e) {
        return e;
      }

    default:
      break;
  }
};

export const getRequest = async (url, token, params) =>
  request(`${url}?${queryString.stringify(params)}`, 'GET', token, params);

export const postRequest = async (url, token, params) =>
  request(url, 'POST', token, { body: JSON.stringify(params) });

export const logOut = async (url, token, params) => {
  localStorage.removeItem('authCode');
  return request(url, 'POST', token, { body: JSON.stringify(params) });
};
