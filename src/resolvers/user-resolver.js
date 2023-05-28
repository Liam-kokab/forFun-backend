const bcrypt = require('bcrypt');
const { v4: uuid } = require('uuid');
const jwt = require('jsonwebtoken');

const createToken = (secret, payload = {}) => jwt.sign(payload, secret, { expiresIn: '30d' });
const sanitizeAndAddToken = ({ id, name, email, token }, secret) =>
  ({ id, name, email, token: createToken(secret, { id, name, email }) });

const signUp = async (_, { user }, { models, secret, pubSub }) => {
  const id = uuid();

  // salting and hashing password.
  const salt = await bcrypt.genSalt(12);
  const passHash = await bcrypt.hash(user.password, salt);

  const { dataValues } = await models.User.create({ ...user, id, password: passHash })
    .catch(err => {
      console.log('error occurred while inserting new user \n\n', err);
    });

  if (!dataValues) return;
  return sanitizeAndAddToken({ ...dataValues }, secret);
};

const signIn = async (_, { user }, { models, secret }) => {
  const { email, password } = user;
  const { dataValues } = await models.User.findOne({ where: { email } }) || {};
  if (dataValues && await bcrypt.compare(password, dataValues.password)) {
    return sanitizeAndAddToken({ ...dataValues }, secret);
  }
};

const getUserById = async (id, models) => await models.User.findByPk(id);

module.exports = {
  getUserById,
  signUp,
  signIn
};
