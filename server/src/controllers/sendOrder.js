import { jsonToWb } from '../../../client/src/services/jsonToWb.js';
import nodemailer from 'nodemailer';
import fs from 'fs';
import { fileToArray } from '../services/arrayFile.js';

export const sendOrder = async (req, res) => {
  try {
    await jsonToWb(
      JSON.parse(req.body.selectedGoods),
      req.body.giftId,
      req.body.customer,
    ).xlsx.writeFile(`./src/data/order_${req.body.giftId}.xlsx`);

    const adminData = await fileToArray('adminData.json');

    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: adminData.email,
        pass: adminData.passApp,
      },
    });
    console.log({
      user: adminData.email,
      pass: adminData.passApp,
    });

    const mail_configs = {
      from: 'gk-konfi',
      to: adminData.orderEmail,
      subject: 'Заказ на сборный подарок',
      text: `Поступил заказ на сборный подарок от пользователя ${req.body.customer.name} c электронным адресом ${req.body.customer.email}\nКомментарий: ${req.body.customer.message}`,
      attachments: [
        {
          filename: `order_${req.body.giftId}.xlsx`,
          path: `./src/data/order_${req.body.giftId}.xlsx`,
        },
      ],
    };

    const info = await transporter.sendMail(mail_configs);

    // Удаление файла после успешной отправки
    fs.unlink(`./src/data/order_${req.body.giftId}.xlsx`, (err) => {
      if (err) {
        console.error(`Error deleting file: ${err}`);
      }
    });

    return res.send({ info });
  } catch (error) {
    console.log('Ошибка отправки:', error);
    return res
      .status(500)
      .send({ error: 'Произошла ошибка при выполнении запроса' });
  }
};
