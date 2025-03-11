export const typeDefs = `
  type Book {
    title: String 
    author: String

    authorAndTitle: String
  }
  type Query {
    getBooks:[Book]

    getBook:Book
    
    book(title: String!): Book  
  }
  type Mutation {
    createBook(title: String!, author: String!): Book
    
  }
`;
