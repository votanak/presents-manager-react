import { express } from 'express';

export const giftRouter = express.Router();

giftRouter.get('/send_order', auth, getMessagesByRoomId);
export default router;
