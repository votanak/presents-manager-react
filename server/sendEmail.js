const express = require('express');
const nodemailer = require('nodemailer');
const { writeXLSX } = require('./writeXLSX');
const cors = require('cors');
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

app.post('/write_array', (req, res) => {
  fs.writeFile(
    './data/priceArray.json',
    JSON.stringify(req.body),
    'utf8',
    (err) => {
      if (err) console.log(err);
      console.log('success');
    },
  );
});
