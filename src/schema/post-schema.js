const { gql } = require('apollo-server-express');

module.exports = gql`
    type PostBody {
        text: String
        image: String
    }

    type Post {
        id: String
        user_id: String
        title: String
        body: PostBody
        created_at: String
        updated_at: String
        next_update: String
        update_schedule: [String]
    }

    input PostBodyInput {
        text: String
        image: String
    }
    
    input PostInput {
        title: String
        body: PostBodyInput
    }
`;
