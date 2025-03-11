const typeDefs = `
  type Book {
    id: ID!
    title: String!
    : String!
  }

  type Query {
    getPosts: [Post]
    getPost(id: ID!): Post
  }

  type Mutation {
    createPost(title: String!, content: String!): Post
  }
`;

export default typeDefs;
