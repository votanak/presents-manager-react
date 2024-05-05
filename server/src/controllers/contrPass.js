import { sendWrapped } from '../services/sendWrapper.js';
import { v4 as uuidv4 } from 'uuid';
import nodemailer from 'nodemailer';
import { arrayToFile, fileToArray } from '../services/arrayFile.js';
import { checkTimeUuid } from '../services/checkTimeUuid.js';

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
      text: `Ссылка для изменения данных администратора: http://localhost:3000/change-pass-page/${changePassUuid}`,
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

export const checkPassUuid = async (req, res) => {
  try {
    let changePassArray = await fileToArray('passUuids.json');
    sendWrapped(req, res, {
      response: Object.keys(changePassArray).includes(req.params.passUuid),
    });
  } catch (error) {
    console.log(error, 'ошибка проверки uuid смены пароля');
    throw error;
  }
};

export const writeAdminData = () => {};
export const getAdminData = async (req, res) => {
  let adminData = await fileToArray('adminData.json');
  sendWrapped(req, res, adminData);
};
