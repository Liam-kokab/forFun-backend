const { v4: uuid } = require('uuid');
const { AuthenticationError } = require('apollo-server-express');

const { getUserById } = require('./user-resolver');
const { removeDuplicates } = require('../helpers/array-helper');

const getPostById = async (id, models) => await models.Post.findByPk(id);

const createPost = async ({ post = {} }, { models, me }) => {
  const { id: user_id } = me || {};
  if (!user_id) {
    return AuthenticationError;
  }
  const { title } = post
  const id = uuid();

  const newPost = {
    id,
    title,
    user_id,
  };

  const { dataValues } = await models.Post.create(newPost)
    .catch(err => {
      console.log('error occurred while inserting new post \n\n', err);
    });

  return dataValues;
};

const updatePost = async ({ post = {} }, { models, me }) => {
  const { id: user_id } = me || {};
  if (!user_id) {
    return AuthenticationError;
  }

  if (post.id) {
    try {
      return await models.Post.update(
        { ...post },
        { where: { id: post.id } },
      );
    } catch (e) {
      console.log('error occurred while updating post \n\n', e);
    }
  }
};

const post = async (id, { models, me }) => {
  const { id: user_id } = me || {};
  if (!user_id) {
    return AuthenticationError;
  }
  return await getPostById(id, models);
};

const posts = async (id, { models, me }) => {
  const { id: user_id } = me || {};
  if (!user_id) {
    return AuthenticationError;
  }
  return await getPostById(id, models);
};

const deletePost = async (id, { models, me }) => {
  const { id: user_id } = me || {};
  if (!user_id) {
    return AuthenticationError;
  }

  try {
    models.Post.destroy({
      where: {
        id,
      }
    });

    return true;
  } catch (e) {
    console.log('error occurred while deleting post \n\n', e);
  }
};

module.exports = {
  createPost,
  updatePost,
  post,
  posts,
  deletePost,
};
