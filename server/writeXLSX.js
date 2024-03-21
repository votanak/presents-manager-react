import { jsonToWb } from '../client/src/services/jsonToWb.js';

export const writeXLSX = (reqBody) => {
  jsonToWb(JSON.parse(reqBody.selectedGoods), reqBody.giftId).xlsx.writeFile(
    `./data/order_${reqBody.giftId}.xlsx`,
  );
  return;
};
