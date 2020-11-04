import express, { Request, Response } from 'express';
import { router } from './routes/loginRoutes';
import bodyParser from 'body-parser';
import cookieSession from 'cookie-session';

const app = express();

// Note/Reminder: middlewares must be wired up before the routes,
// otherwise the route will get errors trying to use them

// use body parser to parse form requests
app.use(bodyParser.urlencoded({ extended: true }));

// use cookie session for creating login session (note, a random value must be provided when 
// passing the keys array... I used "initKey")
app.use(cookieSession({ keys: ['initKey']}));

// Route Handlers
app.use(router);

// start app on localhost:3000
app.listen(3000, () => {
  console.log('listening on port 3000');
});