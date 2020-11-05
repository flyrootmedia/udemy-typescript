// NOTE: see express01 for notes on original implementation
// see https://www.npmjs.com/package/ts-express-decorators for a fully baked decorators solution package

import express from 'express';
import { router } from './routes/loginRoutes';
import bodyParser from 'body-parser';
import cookieSession from 'cookie-session';

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieSession({ keys: ['initKey']}));
app.use(router);

app.listen(3000, () => {
  console.log('listening on port 3000');
});