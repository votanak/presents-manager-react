let XLSX = require('xlsx');

const writeXLSX = (reqBody) => {
  let selectedGoods = JSON.parse(reqBody.selectedGoods);

  let goods_to_write = Object.keys(selectedGoods)
    .filter((el1) => el1 !== 'pack')
    .map((el) => ({
      Артикул: selectedGoods[el].good.id,
      Наименование: selectedGoods[el].good.name,
      Количество: selectedGoods[el].quantity,
    }));

  const workbook = XLSX.utils.book_new();
  const worksheet = XLSX.utils.json_to_sheet([]);
  XLSX.utils.sheet_add_json(worksheet, goods_to_write, {
    origin: 'A5',
  });
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Заказ');
  XLSX.writeFile(workbook, `./data/order_${reqBody.giftId}.xlsx`);
  return;
};

module.exports = { writeXLSX };
