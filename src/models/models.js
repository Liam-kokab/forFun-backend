const { Sequelize } = require('sequelize');

const { DB_USER_NAME, DB_PASSWORD, DB_URL, DB_PORT, DB_NAME } =  process.env || {};

const sequelize = new Sequelize(`postgres://${DB_USER_NAME}:${DB_PASSWORD}@${DB_URL}:${DB_PORT}/${DB_NAME}`);

const models = {
  User: require('./user-module')(sequelize, Sequelize),
  Post: require('./post-module')(sequelize, Sequelize),
};

Object.keys(models).forEach(key => {
  if ('associate' in models[key]) {
    models[key].associate(models);
  }
});

module.exports = {
  sequelize,
  models,
};
