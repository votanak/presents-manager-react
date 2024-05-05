import express from 'express';
import cors from 'cors';
import giftRouter from './src/routes/giftRouter.js';
import { checkAllPassUuids } from './src/services/checkTimeUuid.js';

const app = express();
const port = process.env['PORT'] ?? 5000;

app.use(cors());
app.use(express.json({ limit: '25mb' }));
app.use(express.urlencoded({ limit: '25mb', extended: true }));
app.use((req, res, next) => {
  res.setHeader('Acccess-Control-Allow-Origin', '*');
  next();
});
app.use('/static', express.static('./src/public'));

app.use('/', giftRouter);

checkAllPassUuids();

app.listen(port, () => {
  console.log(`listening on port ${port} ...`);
});
