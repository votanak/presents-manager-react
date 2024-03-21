const Excel = require('exceljs');
const jsonToWb = require('../client/src/services/jsonToWb');

const writeXLSX = (reqBody) => {
  Excel.writeFile(
    jsonToWb(JSON.parse(reqBody.selectedGoods)),
    `./data/order_${reqBody.giftId}.xlsx`,
  );
  return;
};

module.exports = { writeXLSX };
