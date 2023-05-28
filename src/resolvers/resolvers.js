const { signIn, signUp } = require('./user-resolver');
const { createPost, getPost, updatePost } = require('./post-resolver');

const resolvers = {
  Query: {
    // user query resolvers
    user: async (_, { id }, { models }) => await models.User.findById(id),

    // element query resolvers
    post: async (_, { id }, context) => await getElement(id, context),
  },
  Mutation: {
    // user mutation resolvers
    signUp,
    signIn,

    // element mutation resolvers
    createPost,
    updatePost,
  }
}

module.exports = resolvers;
