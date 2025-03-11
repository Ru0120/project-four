import { ApolloServer } from "@apollo/server";
import mongoose, { mongo } from "mongoose";
import dotenv from "dotenv";
import resolvers from "../src/graphql/resolvers";
import { typeDefs } from "../src/graphql/typeDefs";

import { expressMiddleware } from "@apollo/server/express4";
import express from "express";
dotenv.config();

const app = express();

interface Book {
  title: string;
  author: string;
  authorAndTitle?: string;
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

mongoose.connect(process.env.MONGO_URL as string).then(() => {
  console.log("connected to MONGO");
});
const startServer = async () => {
  await server.start();

  app.use("/graphql", express.json(), expressMiddleware(server));

  app.listen(4000, () => {
    console.log("server started on 4000");
  });
};

startServer();
