import { getRequest } from './serverRequest.js';

export const refreshJson = async (id, token, setPackArray, setPriceArray) => {
  let pName;
  let setArray;
  if (id.toString().slice(0, 2) === 'up') {
    pName = 'packArray';
    setArray = setPackArray;
  } else {
    pName = 'priceArray';
    setArray = setPriceArray;
  }
  let data = await getRequest('/get_json', token, {
    filename: pName,
  });
  setArray(data);
};
