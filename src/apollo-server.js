const { ApolloServer } = require('@apollo/server');
const jwt = require('jsonwebtoken');

const typeDefs = require('./schema/schema');
const resolvers = require('./resolvers/resolvers');
const { models, sequelize } = require('./models/models');
const { ApolloServerPluginDrainHttpServer } = require('@apollo/server/plugin/drainHttpServer');
const { useServer } = require('graphql-ws/lib/use/ws');
const { WebSocketServer } = require('ws');
const { makeExecutableSchema } = require('graphql-tools');
const { PubSub } = require('graphql-subscriptions');

const getMe = async req => {
  const token = req.headers?.authorization;

  if (token) {
    try {
      return await jwt.verify(token, process.env.SECRET);
    } catch (e) {}
  }
};
const pubSub = new PubSub();

const context = async ({ req, connection }) => {
  if (connection) {
    return {
      models
    };
  }

  if (req) {
    return {
      me: await getMe(req),
      models,
      pubSub,
      secret: process.env.SECRET,
    };
  }
};

const getApolloServer = (httpServer, pubSub) => {
  const schema = makeExecutableSchema({typeDefs, resolvers});

  const wsServer = new WebSocketServer({
    server: httpServer,
    path: "/graphql" // localhost:3000/graphql
  });

  const serverCleanup = useServer({ schema }, wsServer);

  return new ApolloServer({
    introspection: true,
    playground: true,
    schema,
    formatError: error => {
      const message = error.message
        .replace('SequelizeValidationError: ', '')
        .replace('Validation error: ', '');

      return { ...error, message };
    },
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      {
        async serverWillStart() {
          return {
            async drainServer() {
              await serverCleanup.dispose();
            }
          }
        }
      }
    ]
  });
};

module.exports = {
  getApolloServer,
  sequelize,
  context,
};
