require('dotenv').config();
const express = require('express');
const { createServer } = require('http');
const { expressMiddleware } = require('@apollo/server/express4');
const cors = require('cors');
const bodyParser = require('body-parser');

const { getApolloServer, sequelize, context } = require('./src/apollo-server');

const main = async () => {

  const app = express();
  const httpServer = createServer(app);

  const apolloServer = getApolloServer(httpServer);
  await apolloServer.start();

  app.use('/ping', (req, res) => {
    res.send('pong');
  });

  app.use('/graphql', cors(), bodyParser.json(), expressMiddleware(apolloServer, { context }));

  const nukeDatabase = false;
  const isDev = process.env.ENV === 'DEV';
  const port = process.env.PORT || 4000;
  await sequelize.sync({ force: isDev && nukeDatabase, logging: false });


  httpServer.listen(port, () => {
    console.log(`🚀 Apollo Server on http://localhost:${port}/graphql`);
    console.log(`🚀 Subscriptions ready at ws://localhost:${port}/graphql`);
  });
};

main();

// https://github.com/coopercodes/LiveNewsAPI/blob/main/server.ts
