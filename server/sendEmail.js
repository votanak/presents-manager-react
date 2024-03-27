import express from 'express';
import nodemailer from 'nodemailer';
import cors from 'cors';
import url from 'url';
import fs from 'fs';
import path from 'path';
import { jsonToWb } from '../client/src/services/jsonToWb.js';
import multer from 'multer';

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
  fs.writeFile(
    `./data/${req.body.filename}.json`,
    JSON.stringify(checkImages(req.body.data)),
    'utf8',
    (err) => {
      if (err) res.status(500).send({ mesage: 'Internal server error' });
      res.status(200).send({ response: 'successfully writed' });
    },
  );
});

app.get('/get_json', (req, res) => {
  fs.readFile(
    `./data/${url.parse(req.url, true).query.filename}.json`,
    'utf8',
    (err, data) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Internal Server Error');
        console.error('Ошибка чтения файла:', err);
        return;
      }
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end(data);
      console.log('Данные из файла успешно отправлены');
    },
  );
});

const checkImages = (array) => {
  let resultArray = [];
  array.forEach((gd) => {
    let blank =
      gd.id.toString().slice(0, 2) === 'up'
        ? 'blank-pack.svg'
        : 'blank-good.svg';
    fs.existsSync(`./public/good-pictures/img-${gd.id}.png`)
      ? resultArray.push({ ...gd, picture: `img-${gd.id}.png` })
      : resultArray.push({ ...gd, picture: blank });
  });
  return resultArray;
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/good-pictures');
  },
  filename: function (req, file, cb) {
    // Используем оригинальное имя файла из запроса
    cb(null, `img-${file.originalname}`);
  },
});
const upload = multer({ storage: storage });

app.post('/write_img', upload.single('file'), (req, res) => {
  try {
    console.log('uploading1', req.file.originalname);

    // Обработка ошибок загрузки файла, если есть
    if (req.fileValidationError) {
      return res.status(400).send(req.fileValidationError);
    } else if (!req.file) {
      return res.status(400).send('Нет загруженного файла');
    }

    // Разрешенные расширения файлов
    const allowedExtensions = ['.png', '.jpg', '.jpeg', '.gif'];

    function allowedFile(filename) {
      const ext = path.extname(filename).toLowerCase();
      return allowedExtensions.includes(ext);
    }

    if (!allowedFile(req.file.originalname)) {
      return res.status(400).send('Недопустимое расширение файла');
    }

    res.send(`
       <h2>Файл загружен успешно</h2>
       <p>Имя файла: ${req.file.originalname}</p>
       <p>Размер файла: ${req.file.size} bytes</p>
     `);
  } catch (error) {
    console.error('Ошибка загрузки файла:', error);
    res.status(500).send('Ошибка загрузки файла');
  }
});
