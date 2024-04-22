import fs from 'fs';
import url from 'url';
import { arrayToFile } from '../services/arrayFile.js';
import { globSync } from 'glob';
import path from 'path';

export const writeJson = async (req, res) => {
  try {
    arrayToFile(`${req.body.filename}.json`, checkImages(req.body.data));
    return res.send({ msg: 'json successfully writed' });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ 'server write error': error });
  }
};

const checkImages = (array) => {
  let resultArray = [];
  array.forEach((gd) => {
    let blank =
      gd.id.toString().slice(0, 2) === 'up'
        ? 'blank-pack.svg'
        : 'blank-good.svg';
    const files = globSync(`./src/public/good-pictures/img-${gd.id}-*.*`);
    files.length
      ? resultArray.push({
          ...gd,
          picture: `${path.basename(files[0])}`,
        })
      : resultArray.push({ ...gd, picture: blank });
  });
  return resultArray;
};

export const getJson = async (req, res) => {
  fs.readFile(
    `./src/data/${url.parse(req.url, true).query.filename}.json`,
    'utf8',
    (err, data) => {
      if (err) {
        res.status(500).send('Internal Server Error');
        console.error('Ошибка чтения файла:', err);
        return;
      }
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      console.log('get_json: Данные из файла успешно отправлены');
      res.end(data);
      return;
    },
  );
};
