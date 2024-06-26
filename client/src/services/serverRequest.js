import queryString from 'query-string';

export const request = async (url, method, token, params) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_REACT_APP_SERVER_URL}${url}`,
      {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        ...(method === 'POST' ? params : {}),
      },
    );
    return response.json();
  } catch (e) {
    console.log(e);
    return e;
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
