import config from 'config';
import express from 'express';
const morgan = require('morgan');
import bodyParser from 'body-parser';
import auth from './middleware/auth';
import asyncWrapper from './utils/async-wrapper';

const serverPort = config.get('server.port')

const app: express.Application = express();

if (process.env.NODE_ENV === 'development') app.use(morgan('tiny'));
app.use(asyncWrapper(auth));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Hello Peace!')
})

import users from './routes/users'
app.use('/users', users);

app.listen(serverPort, () => {
  // tslint:disable-next-line:no-console
  console.log(`Express app listen on http://localhost:${serverPort}`)
})
