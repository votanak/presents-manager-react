import fs from 'fs';

export const fileToArray = async (fileName) => {
  try {
    const data = await fs.promises.readFile(`./src/data/${fileName}`, 'utf8');
    const array = JSON.parse(data);
    return array;
  } catch (error) {
    console.error('Ошибка чтения JSON:', error);
    throw error; // Пробрасываем ошибку в вызывающий код
  }
};

export const arrayToFile = (fileName, obj) => {
  try {
    fs.writeFile(
      `./src/data/${fileName}`,
      JSON.stringify(obj),
      'utf8',
      (err) => {
        if (err) {
          return err;
        } else {
        }
        return;
      },
    );
    console.log(`arrayToFile: файл ${fileName} записан`);
  } catch (error) {
    console.error('Ошибка записи файла:', error);
  }
};
