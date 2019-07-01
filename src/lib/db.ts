import config from 'config';
import { Sequelize } from 'sequelize'

const host: string = config.get('db.host')
const port: number = config.get('db.port')
const database: string = config.get('db.database')
const username: string = config.get('db.user')
const password: string = config.get('db.password')

const sequelize = new Sequelize(database, username, password, {
  host,
  port,
  dialect: 'postgres'
});

export default sequelize;
