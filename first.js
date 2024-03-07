const express = require('express');
const nodemailer = require('nodemailer');
const app = express();
const port = 5000;

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
        console.log(error);
        return reject({ message: 'An error has occured' });
      }
      return resolve({ message: 'Email sent succesfully' });
    });
  });
};

app.get('/', (req, res) => {
  sendEmail({
    customerName: 'RRRRR',
    customerEmail: 'votanak@yandex.ru',
    message: 'Вот такой вот заказ',
  })
    .then((response) => res.send(response.message))
    .catch((error) => res.status(500).send(error.message));
});
app.post('/send_email', (req, res) => {
  sendEmail()
    .then((response) => res.send(response.message))
    .catch((error) => res.status(500).send(error.message));
});

app.listen(port, () => {
  console.log(`nodemailer listening port${port}`);
});
