import { fileToArray, arrayToFile } from '../services/arrayFile.js';
import { globSync } from 'glob';
import fs from 'fs';
import path from 'path';

export const writeImg = async (req, res) => {
  try {
    let id = req.body.id;
    let arrayFilename =
      req.body.id.slice(0, 2) === 'up' ? 'packArray.json' : 'priceArray.json';
    let pArray = await fileToArray(`${arrayFilename}`);
    let i = pArray.findIndex((el) => el.id.toString() === id);
    // удаляем старый файл
    const oldFileName = globSync(`./public/good-pictures/img-${id}*.*`)[0];
    console.log(oldFileName);
    fs.unlink(`./${oldFileName}`, (err) => {
      if (err) {
        console.error(`Error deleting file: ${err}`);
      } else {
        console.log('file deleted');
      }
    });
    const newFileName = `img-${id}-${Date.now()}${path
      .extname(req.file.originalname)
      .toLowerCase()}`;
    //обновляем json
    pArray = [
      ...pArray.slice(0, i),
      {
        ...pArray[i],
        picture: newFileName,
      },
      ...pArray.slice(i + 1),
    ];
    arrayToFile(arrayFilename, pArray); // запись обновлённого json'a

    //Записываем новый файл
    fs.writeFile(
      `./public/good-pictures/${newFileName}`,
      req.file.buffer,
      (err) => {
        if (err) {
          console.log(err);
        } else {
          console.log('new img file successfully writed');
        }
      },
    );
    return res.send('image successfully writed');
  } catch (error) {
    console.error('Ошибка загрузки файла:', error);
    res.status(500).send('write_img: Ошибка загрузки файла');
  }
};
