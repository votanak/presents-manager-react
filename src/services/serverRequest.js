import queryString from 'query-string';

export const request = async (url, method, token, params) => {
  try {
    let response = 'resp';
    await new Promise((resolve) => setTimeout(resolve, 2000));
    return response;
  } catch (e) {
    return e;
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
  request(url, 'POST', token, { body: JSON.stringify(params) });

export const logOut = async (url, token, params) => {
  localStorage.removeItem('authCode');
  return request(url, 'POST', token, { body: JSON.stringify(params) });
};
