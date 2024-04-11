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

app.post('/write_img', imgMulter.single('file'), async (req, res) => {
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
});
