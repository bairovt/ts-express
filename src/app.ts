import config from 'config';
import express from 'express';
const morgan = require('morgan');
import bodyParser from 'body-parser';
import auth from './middleware/auth';
import errorHandler from './middleware/error-handler';
import asyncWrapper from './utils/async-wrapper';
const cors = require('cors');

const serverPort = config.get('server.port')

const app: express.Application = express();
app.use(cors());
if (process.env.NODE_ENV === 'development') app.use(morgan('tiny'));
app.use(asyncWrapper(auth));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Hello Peace!')
})

import users from './routes/users'
import clients from './routes/clients'
import products from './routes/products'
import orders from './routes/orders'
app.use('/api/users', users);
app.use('/api/clients', clients);
app.use('/api/products', products);
app.use('/api/orders', orders);

app.use(function (req, res, next) {
  res.status(404).send({ message: 'The Resource Not Found' });
})
app.use(errorHandler);

app.listen(serverPort, () => {
  // tslint:disable-next-line:no-console
  console.log(`Express app listen on http://localhost:${serverPort}`)
})
