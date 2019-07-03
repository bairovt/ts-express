import config from 'config';
import express from 'express';
const morgan = require('morgan');
import bodyParser from 'body-parser';
import auth from './middleware/auth';
import errorHandler from './middleware/error-handler';
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
import clients from './routes/clients'
import products from './routes/products'
app.use('/users', users);
app.use('/clients', clients);
app.use('/products', products);

app.use(errorHandler);

app.listen(serverPort, () => {
  // tslint:disable-next-line:no-console
  console.log(`Express app listen on http://localhost:${serverPort}`)
})
