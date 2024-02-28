import queryString from 'query-string';
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

    default:
      break;
  }
};

export const getRequest = async (url, token, params) => {
  return request(
    `${url}?${queryString.stringify(params)}`,
    'GET',
    token,
    params,
  );
};

export const postRequest = async (url, token, params) =>
  request(url, 'POST', token, { body: params });

export const logOut = async (url, token, params) => {
  localStorage.removeItem('authCode');
  return request(url, 'POST', token, { body: JSON.stringify(params) });
};
