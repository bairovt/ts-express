import express from 'express';
import config from 'config';

const serverPort = config.get('server.port')

const app: express.Application = express();

app.get('/', (req, res) => {
  res.send('Hello Peace!')
})

import users from './routes/users'
app.use('/users', users);

app.listen(serverPort, () => {
  // tslint:disable-next-line:no-console
  console.log(`Express app listen on http://localhost:${serverPort}`)
})
