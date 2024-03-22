import { jsonToWb } from '../client/src/services/jsonToWb.js';

export const writeXLSX = (reqBody) => {
  console.log(
    'начало:',
    jsonToWb(JSON.parse(reqBody.selectedGoods)),
    reqBody.giftId,
  );
  jsonToWb(JSON.parse(reqBody.selectedGoods), reqBody.giftId).xlsx.writeFile(
    `./data/order_${reqBody.giftId}.xlsx`,
  );
  return;
};
