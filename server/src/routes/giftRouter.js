import express from 'express';
import { getJson, writeJson } from '../controllers/contrJson.js';
import { imgMulter } from '../middleware/img-multer.js';
import { sendOrder } from '../controllers/sendOrder.js';
import { writeImg } from '../controllers/writeImg.js';
import { getTokenSilently, logout, login } from '../controllers/Login.js';
import { changePass, sendChangeEmail } from '../controllers/contrPass.js';

const giftRouter = express.Router();

giftRouter.post('/send_order', sendOrder);
giftRouter.get('/get_json', getJson);
giftRouter.post('/write_json', writeJson);
giftRouter.post('/write_img', imgMulter.single('file'), writeImg);
giftRouter.post('/login', login);
giftRouter.post('/send_change_email', sendChangeEmail);
giftRouter.post('/change_pass', changePass);
giftRouter.post('/get_token_silently', getTokenSilently);
giftRouter.post('/logout', logout);

export default giftRouter;
