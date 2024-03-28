import { postRequest, getRequest } from './serverRequest.js';

export const refreshJson = (
  id,
  newFileName,
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
  let i = pArray.findIndex((el) => el.id === id);
  pArray = [
    ...pArray.slice(0, i),
    { ...pArray[i], picture: newFileName },
    ...pArray.slice(i + 1),
  ];
  postRequest('/write_json', token, {
    filename: pName,
    data: pArray,
  }).then(async () => {
    let data = await getRequest('/get_json', token, {
      filename: pName,
    });
    setArray(data);
  });
};
