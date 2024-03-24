import Excel from 'exceljs';

export const jsonToWb = (selectedGoods, giftId, customer) => {
  const wb = new Excel.Workbook();
  const ws = wb.addWorksheet('Сборный подарок', {
    views: [{ state: 'frozen', xSplit: 1, ySplit: 1 }],
  });

  ws.getRow(1).values = ['Сборный подарок'];
  ws.getRow(3).values = [
    'Заказ',
    `№${giftId} от ${new Date().toLocaleString('ru', {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      timezone: 'UTC',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
    })}`,
  ];
  ws.getRow(5).values = [
    'Артикул',
    'Наименование',
    'Кол-во, шт.',
    'Вес, грамм',
    'Стоимость, руб.',
  ];
  ws.getRow(6).values = [
    selectedGoods.pack.id,
    `Упаковка ${selectedGoods.pack.name} ${selectedGoods.pack.giftWeight} гр.`,
    ,
    ,
    selectedGoods.pack.price1,
  ];
  Object.keys(selectedGoods)
    .filter((el1) => el1 !== 'pack' && el1 !== 'giftQuantity')
    .forEach((el, ind) => {
      ws.getRow(7 + ind).values = [
        selectedGoods[el].good.id,
        selectedGoods[el].good.name,
        selectedGoods[el].quantity,
        selectedGoods[el].quantity * +selectedGoods[el].good.weight1,
        selectedGoods[el].quantity * +selectedGoods[el].good.price1,
      ];
    });

  const sglength = Object.keys(selectedGoods).length;

  ws.getRow(7 + sglength).values = [
    '',
    'Итого по подному подарку:',
    '',
    { formula: `SUM(D6:D${6 + sglength})` },
    { formula: `SUM(E6:E${6 + sglength})` },
  ];
  ws.getRow(8 + sglength).values = [
    '',
    'Итого по заказу:',
    selectedGoods.giftQuantity,
    { formula: `D${7 + sglength}*C${8 + sglength}` },
    { formula: `E${7 + sglength}*C${8 + sglength}` },
  ];

  ws.getRow(5).alignment = {
    wrapText: true,
    horizontal: 'center',
    vertical: 'middle',
  };
  ws.getCell('A1').alignment = {
    vertical: 'middle',
  };
  ws.getRow(1).alignment = {
    horizontal: 'center',
  };
  ws.getRow('A6').alignment = {
    horizontal: 'right',
  };
  ws.getCell(`A1`).font = {
    bold: true,
    size: 14,
  };
  ws.getCell(`B${7 + sglength}`).font = {
    bold: true,
  };
  ws.getCell(`D${7 + sglength}`).font = {
    bold: true,
  };
  ws.getCell(`E${7 + sglength}`).font = {
    bold: true,
  };
  ws.getCell(`B${8 + sglength}`).font = {
    bold: true,
  };
  ws.getCell(`D${8 + sglength}`).font = {
    bold: true,
  };
  ws.getCell(`E${8 + sglength}`).font = {
    bold: true,
  };
  ws.columns = [
    { width: 10 },
    { width: 40 },
    { width: 12 },
    { width: 12 },
    { width: 12 },
  ];

  ['A', 'B', 'C', 'D', 'E'].forEach((el) => {
    for (let i = 0; i < sglength + 4; i++) {
      ws.getCell(`${el}${i + 5}`).border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      };
    }
  });

  ws.mergeCells('A1:E1');

  ws.getRow(sglength + 10).values = ['Данные заказчика:'];
  ws.getRow(sglength + 11).values = ['Имя:', customer.name];
  ws.getRow(sglength + 12).values = ['Телефон:', customer.phone];
  ws.getRow(sglength + 13).values = ['Почта:', customer.email];

  return wb;
};
