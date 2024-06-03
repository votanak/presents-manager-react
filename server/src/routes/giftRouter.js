import express from 'express';
import { getJson, writeJson } from '../controllers/contrJson.js';
import { imgMulter } from '../middleware/img-multer.js';
import { sendOrder } from '../controllers/sendOrder.js';
import { writeImg } from '../controllers/writeImg.js';
import { getTokenSilently, logout, login } from '../controllers/Login.js';
import {
  sendChangeEmail,
  getAdminData,
  writeAdminData,
} from '../controllers/contrPass.js';

const giftRouter = express.Router();

giftRouter.post('/api/send_order', sendOrder);
giftRouter.get('/api/get_json', getJson);
giftRouter.post('/api/write_json', writeJson);
giftRouter.post('/api/write_img', imgMulter.single('file'), writeImg);
giftRouter.post('/api/login', login);
giftRouter.post('/api/send_change_email', sendChangeEmail);
giftRouter.get('/api/get_admin_data/:passUuid', getAdminData);
giftRouter.post('/api/write_admin_data', writeAdminData);
giftRouter.post('/api/get_token_silently', getTokenSilently);
giftRouter.post('/api/logout', logout);

export default giftRouter;
