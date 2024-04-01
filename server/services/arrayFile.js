import fs from 'fs';

export const fileToArray = async (fileName) => {
  try {
    const data = await fs.promises.readFile(`./data/${fileName}`, 'utf8');
    const array = JSON.parse(data);
    return array;
  } catch (error) {
    console.error('Ошибка чтения файла:', error);
    throw error; // Пробрасываем ошибку в вызывающий код
  }
};

export const arrayToFile = (fileName, obj) => {
  try {
    fs.writeFile(`./data/${fileName}`, JSON.stringify(obj), 'utf8', (err) => {
      if (err) return err;
      console.log('файл записан111');
      return;
    });
  } catch (error) {
    console.error('Ошибка записи файла:', error);
  }
};
