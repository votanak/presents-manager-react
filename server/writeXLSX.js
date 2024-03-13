let XLSX = require('xlsx');

const writeXLSX = (reqBody) => {
  let data_to_write = Object.values(JSON.parse(reqBody.selectedGoods)).map(
    (el) => ({
      Артикул: el.good.id,
      Наименование: el.good.name,
      Количество: el.quantity,
    }),
  );

  const workbook = XLSX.utils.book_new();
  const worksheet = XLSX.utils.json_to_sheet([]);
  XLSX.utils.sheet_add_json(worksheet, data_to_write, {
    origin: 'A5',
  });
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Заказ');
  XLSX.writeFile(workbook, './data/Order.xlsx');
  return 'Order.xlsx';
};

module.exports = { writeXLSX };
