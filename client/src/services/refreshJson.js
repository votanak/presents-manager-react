import { getRequest } from './serverRequest.js';

export const refreshJson = async (
  id,
  token,
  packArray,
  setPackArray,
  priceArray,
  setPriceArray,
) => {
  let pName;
  let pArray;
  let setArray;
  if (id.slice(0, 2) === 'up') {
    pName = 'packArray';
    pArray = packArray;
    setArray = setPackArray;
  } else {
    pName = 'priceArray';
    pArray = priceArray;
    setArray = setPriceArray;
  }
  let data = await getRequest('/get_json', token, {
    filename: pName,
  });
  setArray(data);
};
