import express from 'express';
import nodemailer from 'nodemailer';
import cors from 'cors';
import url from 'url';
import fs from 'fs';
import path from 'path';
import { jsonToWb } from '../client/src/services/jsonToWb.js';
import { globSync } from 'glob';
import { imgMulter } from './middleWare/img-multer.js';
import { arrayToFile } from './services/arrayFile.js';
import { fileToArray } from './services/arrayFile.js';

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json({ limit: '25mb' }));
app.use(express.urlencoded({ limit: '25mb', extended: true }));
app.use((req, res, next) => {
  res.setHeader('Acccess-Control-Allow-Origin', '*');
  next();
});
app.use('/static', express.static('public'));

app.post('/send_order', async (req, res) => {
  try {
    jsonToWb(
      JSON.parse(req.body.selectedGoods),
      req.body.giftId,
      req.body.customer,
    ).xlsx.writeFile(`./data/order_${req.body.giftId}.xlsx`);

    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'telek.kanatov@gmail.com',
        pass: 'glhu dwbo fuhe xivd',
      },
    });

    const mail_configs = {
      from: 'gk-konfi',
      to: 'gvotanak@gmail.com',
      subject: 'Заказ на сборный подарок',
      text: `Поступил заказ на сборный подарок от пользователя ${req.body.customer.name} c электронным адресом ${req.body.customer.email}\nКомментарий: ${req.body.customer.message}`,
      attachments: [
        {
          filename: `order_${req.body.giftId}.xlsx`,
          path: `./data/order_${req.body.giftId}.xlsx`,
        },
      ],
    };

    const info = await transporter.sendMail(mail_configs);

    // Удаление файла после успешной отправки
    fs.unlink(`./data/order_${req.body.giftId}.xlsx`, (err) => {
      if (err) {
        console.error(`Error deleting file: ${err}`);
      }
    });

    return res.send({ info });
  } catch (error) {
    return res
      .status(500)
      .send({ error: 'Произошла ошибка при выполнении запроса' });
  }
});

app.listen(port, () => {
  console.log(`listening port ${port}`);
});

app.post('/write_json', (req, res) => {
  try {
    arrayToFile(`${req.body.filename}.json`, checkImages(req.body.data));
    console.log(checkImages(req.body.data));
    return res.send({ msg: 'json successfully writed' });
  } catch (error) {
    return res.status(500).send({ 'server write error': error });
  }
});

const checkImages = (array) => {
  let resultArray = [];
  array.forEach((gd) => {
    let blank =
      gd.id.toString().slice(0, 2) === 'up'
        ? 'blank-pack.svg'
        : 'blank-good.svg';
    const files = globSync(`./public/good-pictures/img-${gd.id}.*`);
    files.length
      ? resultArray.push({
          ...gd,
          picture: `img-${gd.id}${path.extname(files[0]).toLowerCase()}`,
        })
      : resultArray.push({ ...gd, picture: blank });
  });
  return resultArray;
};

app.get('/get_json', (req, res) => {
  fs.readFile(
    `./data/${url.parse(req.url, true).query.filename}.json`,
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
});

app.post('/write_img', imgMulter.single('file'), async (req, res) => {
  try {
    let id = req.body.id;
    let arrayFilename =
      req.body.id.slice(0, 2) === 'up' ? 'packArray.json' : 'priceArray.json';
    let pArray = await fileToArray(`${arrayFilename}`);
    let i = pArray.findIndex((el) => el.id === id);
    pArray = [
      ...pArray.slice(0, i),
      {
        ...pArray[i],
        picture: `img-${id}${path
          .extname(req.file.originalname)
          .toLowerCase()}`,
      },
      ...pArray.slice(i + 1),
    ];
    arrayToFile(arrayFilename, pArray);

    fs.writeFile(
      `./public/good-pictures/img-${id}${path
        .extname(req.file.originalname)
        .toLowerCase()}`,
      req.file.buffer,
      (err) => {
        if (err) {
          console.log(err);
        } else {
          console.log('successfully');
        }
      },
    );
  } catch (error) {
    console.error('Ошибка загрузки файла:', error);
    res.status(500).send('write_img: Ошибка загрузки файла');
  }
});
