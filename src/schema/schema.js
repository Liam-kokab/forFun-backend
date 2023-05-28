const { gql } = require('apollo-server-express');

const userSchema = require('./user-schema');
const postSchema = require('./post-schema');

const linkSchema = gql`
    type Query {        
        user(id: String!): User

        post(id: String!): Post
    }
    type Mutation {        
        signUp(user: UserInput): User
        signIn(user: UserInput): User
        updateUser(name: String!): User!
        deleteUser(id: String!): Boolean!

        createPost(post: PostInput!): Boolean!
        updatePost(name: PostInput!): Boolean!
        deletePost(id: ID!): Boolean!
        
    }
    type Subscription {
        postAdded: Post
    }
`;

module.exports = [linkSchema, userSchema, postSchema];
