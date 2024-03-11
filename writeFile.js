var XLSX = require('xlsx');

export const writeFile = (goods) => {
  const worksheet = XLSX.utils.json_to_sheet(goods);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Подарки');

  let student_data = [
    {
      Student: 'Nikhil',
      Age: 22,
      Branch: 'ISE',
      Marks: 70,
    },
    {
      Student: 'Amitha',
      Age: 21,
      Branch: 'EC',
      Marks: 80,
    },
  ];

  const ws = XLSX.utils.json_to_sheet(student_data);

  XLSX.utils.book_append_sheet(workbook, ws, 'Подарки');

  XLSX.writeFile(workbook, 'Presents.xlsx');
};
