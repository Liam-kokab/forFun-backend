const { signIn, signUp, user } = require('./user-resolver');
const { createPost, post, posts, updatePost } = require('./post-resolver');

const resolvers = {
  Query: {
    // user query resolvers
    user,

    // element query resolvers
    post,
    posts,
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
