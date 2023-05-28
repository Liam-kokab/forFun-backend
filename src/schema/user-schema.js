const { gql } = require('apollo-server-express');

module.exports = gql`
    type User {
        id: String
        name: String
        email: String
        token: String
    }
    
    input UserInput {
        name: String
        email: String!
        password: String!
    }
`;
