import { sendWrapped } from '../services/sendWrapper.js';
import { v4 as uuidv4 } from 'uuid';
import nodemailer from 'nodemailer';
import { arrayToFile, fileToArray } from '../services/arrayFile.js';
import { checkTimeUuid } from '../services/checkTimeUuid.js';
import 'dotenv/config';

export const sendChangeEmail = async (req, res) => {
  const changePassUuid = uuidv4();
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
      text: `Ссылка для изменения данных администратора: ${process.env.DEPLOY_SITE}:3000/change-pass-page/${changePassUuid}`,
    };

    const info = await transporter.sendMail(mail_configs);

    let changePassArray = await fileToArray('passUuids.json');

    arrayToFile('passUuids.json', {
      ...changePassArray,
      [changePassUuid]: Date.now(),
    });

    checkTimeUuid(changePassUuid);

    sendWrapped(req, res, { response: changePassUuid });
  } catch (error) {
    console.log('Ошибка отправки:', error);
    return res
      .status(500)
      .send({ error: 'Ошибка при отправке ссылки на изменение пароля' });
  }
};

export const getAdminData = async (req, res) => {
  try {
    let passUuids = await fileToArray('passUuids.json');
    sendWrapped(req, res, {
      response: Object.keys(passUuids).includes(req.params.passUuid)
        ? await fileToArray('adminData.json')
        : false,
    });
    arrayToFile('passUuids.json', passUuids);
  } catch (error) {
    console.log(error, 'ошибка проверки uuid смены пароля');
    throw error;
  }
};

export const writeAdminData = async (req, res) => {
  try {
    let passUuids = await fileToArray('passUuids.json');
    if (Object.keys(passUuids).includes(req.body.passUuid)) {
      arrayToFile('adminData1.json', req.body.aData);
      sendWrapped(req, res, {
        response: 'данные админа записаны',
      });
      delete passUuids[req.params.passUuid];
    } else {
      sendWrapped(req, res, {
        response: 'нет такого passUuid',
      });
    }
  } catch (err) {
    console.log('ошибка при записи данных админа');
    throw err;
  }
};
