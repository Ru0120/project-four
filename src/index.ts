import { ApolloServer } from "@apollo/server";
import mongoose, { mongo } from "mongoose";
import dotenv from "dotenv";

import { expressMiddleware } from "@apollo/server/express4";
import express from "express";
dotenv.config();
mongoose.connect(process.env.MONGO_URL as string).then(() => {
  console.log("connected to MONGO");
});

const app = express();

interface Book {
  title: string;
  author: string;
  authorAndTitle?: string;
}

interface Player {
  firstName: string;
  age: number;
  height: number;
  active: boolean;
  favoriteBooks?: String[];
}

const typeDefs = `
  type Book {
    title: String 
    author: String

    authorAndTitle: String
  }

  type Player {
    firstName: String
    age: Int
    height: Float
    active: Boolean

    favoriteBooks: [Book]
  }
    
  type Query {
    books: [Book]
    book(title: String!): Book

    players: [Player]
  }

  type Mutation {
    bookAdd(title: String!, author: String!): String
  }
`;

const books: Book[] = [
  {
    title: "The Awaksdsening",
    author: "Kate Chopin",
  },
  {
    title: "City of Glass",
    author: "Paul Auster",
  },
];

const players: Player[] = [
  {
    firstName: "Bat",
    age: 18,
    active: true,
    height: 6.7,
    favoriteBooks: ["The Awaksdsening", "City of Glass"],
  },
];

const resolvers = {
  Query: {
    books: () => {
      return books;
    },

    book: (_parent: undefined, args: { title: string }) => {
      return books.find((book) => book.title === args.title);
    },

    players: () => {
      return players;
    },
  },

  Mutation: {
    bookAdd: (_parent: undefined, args: { title: string; author: string }) => {
      books.push(args);

      return "Nom amjilttai nemlee";
    },
  },

  Book: {
    authorAndTitle: (parent: Book) => {
      return `${parent.author} ${parent.title}`;
    },
  },

  Player: {
    favoriteBooks: (parent: Player) => {
      const favoriteBooks: Book[] = [];

      parent.favoriteBooks?.forEach((favoriteBook) => {
        const book = books.find((book) => book.title === favoriteBook) as Book;

        favoriteBooks.push(book);
      });

      return favoriteBooks;
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

app.get("/books", (_req, res) => {
  const newBooks = books.map((book: any) => {
    book.authorAndTitle = `${book.author} ${book.title}`;
    return book;
  });

  return newBooks;
});

app.get("/book", (_req, res) => {
  const newBooks = books.map((book: any) => {
    book.authorAndTitle = `${book.author} ${book.title}`;
    return book;
  });

  res.send(newBooks[0]);
});

const startServer = async () => {
  await server.start();

  app.use("/graphql", express.json(), expressMiddleware(server));

  app.listen(4000, () => {
    console.log("server started on 4000");
  });
};

startServer();
