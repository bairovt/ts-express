import express from 'express';
import config from 'config';
const port = config.get('server.port')

const app: express.Application = express();

app.get('/', (req, res) => {
  res.send('Hello Peace!')
})

app.listen(port, () => {
  // tslint:disable-next-line:no-console
  console.log(`Express app listen on port ${port}`)
})
