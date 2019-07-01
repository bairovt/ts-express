import sequelize from "../lib/db";

const checkConnection = async () => {
  try {
    await sequelize.authenticate()
  } catch (error) {
    return console.error('Unable to connect to the database:', error);
  }
  console.log('Connection has been established successfully.');
}

checkConnection()
  .then(() => sequelize.close())
  .then(() => console.log('connection closed'));





