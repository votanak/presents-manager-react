import express from 'express';
import { getJson, writeJson } from '../controllers/contrJson.js';
import { imgMulter } from '../middleWare/img-multer.js';
import { sendOrder } from '../controllers/sendOrder.js';
import { writeImg } from '../controllers/writeImg.js';

const giftRouter = express.Router();

giftRouter.post('/send_order', sendOrder);
giftRouter.get('/get_json', getJson);
giftRouter.post('/write_json', writeJson);
giftRouter.post('/write_img', imgMulter.single('file'), writeImg);

export default giftRouter;
