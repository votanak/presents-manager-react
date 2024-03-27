import { useContext } from 'react';
import { PriceContext } from '../App';
import { postRequest, getRequest } from './serverRequest';
import { LoginContext } from '../App';

export const refreshArray = (pName) => {
  const { auth } = useContext(LoginContext);
  const { packArray, priceArray, setPackArray, setPriceArray } =
    useContext(PriceContext);
  pName === 'packArray' ? packArray : priceArray;
  postRequest('/write_json', auth.token, {
    filename: typeof id === 'number' ? 'priceArray' : 'packArray',
    data: pName === 'packArray' ? packArray : priceArray,
  }).then(async () => {
    let data = await getRequest('/get_json', '', {
      filename: pName,
    });
    pName === 'packArray' ? setPackArray(data) : setPriceArray(data);
  });
};
