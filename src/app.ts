import config from 'config';
import express from 'express';
const morgan = require('morgan');

const serverPort = config.get('server.port')

const app: express.Application = express();

if (process.env.NODE_ENV === 'development') app.use(morgan('tiny'));

app.get('/', (req, res) => {
  res.send('Hello Peace!')
})

import users from './routes/users'
app.use('/users', users);

app.listen(serverPort, () => {
  // tslint:disable-next-line:no-console
  console.log(`Express app listen on http://localhost:${serverPort}`)
})
