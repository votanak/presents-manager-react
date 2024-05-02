import { sendWrapped } from '../services/sendWrapper.js';
import { v4 as uuidv4 } from 'uuid';
import nodemailer from 'nodemailer';
import fs from 'fs';

export const changePass = () => {};

export const sendChangeEmail = async (req, res) => {
  const changePassUuid = uuidv4();
  console.log('sendChangeEmail');
  try {
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
      subject: 'ссылка для смены пароля',
      text: `Ссылка для изменения данных администратора: http://localhost:5000/change-pass-page?${changePassUuid}`,
    };

    const info = await transporter.sendMail(mail_configs);

    return res.send({ info });
  } catch (error) {
    console.log('Ошибка отправки:', error);
    return res
      .status(500)
      .send({ error: 'Произошла ошибка при выполнении запроса' });
  }

  sendWrapped(req, res, { response: changePassUuid });
};
