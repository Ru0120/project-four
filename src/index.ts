import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import {
  bookSchemaTypes,
  bookSchemaQueries,
  bookSchemaMutations,
} from "../src/modules/book/graphql/schema";
import {
  userSchemaTypes,
  userSchemaMutations,
} from "../src/modules/auth/graphql/schema";
import { bookQueries } from "../src/modules/book/graphql/queries";

import { bookMutations } from "./modules/book/graphql/mutations";
import { bookCustomResolvers } from "./modules/book/graphql/resolver";

import { Context } from "./utils/@types";

import { userMutations } from "./modules/auth/graphql/mutations";
dotenv.config();
mongoose
  .connect(process.env.MONGO_URL as string)
  .then(() => {
    console.log("connected to MONGO");
  })
  .catch((err) => console.error(err));

const app = express();

interface Book {
  title: string;
  author: string;
  authorAndTitle?: string;
}

const typeDefs = `
${bookSchemaTypes}
${userSchemaTypes}
  

    
  type Query {
  ${bookSchemaQueries}
    }

  type Mutation {
   ${bookSchemaMutations}
   ${userSchemaMutations}
  }
`;

const resolvers = {
  Query: {
    ...bookQueries,
  },

  Mutation: {
    ...bookMutations,
    ...userMutations,
  },

  // Book: {
  //   ...bookCustomResolvers,
  // },
};
const server = new ApolloServer<Context>({
  typeDefs,
  resolvers,
});

const startServer = async () => {
  await server.start();

  app.use(
    "/graphql",
    express.json(),
    expressMiddleware(server, {
      context: async ({ req, res }) => {
        const token = req.headers.authorization;
        if (token) {
          try {
            const tokendata = jwt.verify(token, "secret") as any;

            return { user: tokendata?.user };
          } catch {
            return { user: null };
          }
        }

        return { user: null };
      },
    })
  );

  app.listen(4000, () => {
    console.log("server started on 4000");
  });
};

startServer();
