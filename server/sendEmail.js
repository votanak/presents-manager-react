const express = require('express');
const nodemailer = require('nodemailer');
const { writeXLSX } = require('./writeXLSX');
const cors = require('cors');
const url = require('url');
const fs = require('fs');
const { unlink } = require('node:fs');
const app = express();
const port = 5000;

app.use(cors());
app.use(express.json({ limit: '25mb' }));
app.use(express.urlencoded({ limit: '25mb' }));
app.use((req, res, next) => {
  res.setHeader('Acccess-Control-Allow-Origin', '*');
  next();
});

const sendEmail = ({ customerName, customerEmail, message }) => {
  return new Promise((resolve, reject) => {
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
      text: `Поступил заказ на сборный подарок от пользователя ${customerName} c электронным адресом ${customerEmail}\nКомментарий: ${message}`,
      attachments: [
        {
          filename: 'Order.xlsx',
          path: './data/Order.xlsx',
        },
      ],
    };

    transporter.sendMail(mail_configs, (error, info) => {
      if (error) {
        return reject({ message: 'An error has occured' });
      }
      return resolve({ message: 'Email sent succesfully' });
    });
  });
};

app.post('/send_order', (req, res) => {
  const fileName = writeXLSX(req.body);
  sendEmail(req.body)
    .then((response) => {
      unlink(`./data/${fileName}`, (err) => {
        if (err) throw err;
      });
      return res.send(response);
    })
    .catch((error) => res.status(500).send(error.message));
});

app.listen(port, () => {
  console.log(`listening port ${port}`);
});

app.post('/write_json', (req, res) => {
  fs.writeFile(
    `./data/${req.body.filename}.json`,
    JSON.stringify(req.body.data),
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
