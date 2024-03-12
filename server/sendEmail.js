const express = require('express');
const nodemailer = require('nodemailer');
const { writeXLSX } = require('./writeXLSX');
const cors = require('cors');
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
  console.log();
  writeXLSX(req.body);
  sendEmail(req.body)
    .then((response) => res.send(response))
    .catch((error) => res.status(500).send(error.message));
});

app.listen(port, () => {
  console.log(`nodemailer listening port${port}`);
});
