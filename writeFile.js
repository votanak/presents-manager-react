var XLSX = require('xlsx');
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

const writeFile = (goods) => {
  const worksheet = XLSX.utils.json_to_sheet(goods);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Подарки');

  const ws = XLSX.utils.json_to_sheet(student_data);

  XLSX.writeFile(workbook, 'Presents.xlsx');
};

writeFile(student_data);

module.exports = { writeFile };
