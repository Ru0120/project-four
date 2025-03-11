import { Books } from "../models/book";

const resolvers = {
  Query: {
    getBooks: async () => {
      return await Books.find();
    },
    getBook: async (_: any, { id }: { id: string }) => {
      return await Books.findById(id);
    },
  },
  Mutation: {
    createBook: (
      _parent: undefined,
      doc: { title: string; author: string }
    ) => {
      const book = Books.create(doc);

      return book;
    },
  },
};
// const resolvers = {
//     Query: {
//       books: () => {
//         return books;
//       },

//       book: (_parent: undefined, args: { title: string }) => {
//         return books.find((book) => book.title === args.title);
//       },
//     },

//     Mutation: {
//       bookAdd: (_parent: undefined, args: { title: string; author: string }) => {
//         books.push(args);

//         return "Nom amjilttai nemlee";
//       },
//     },

//     Book: {
//       authorAndTitle: (parent: Book) => {
//         return `${parent.author} ${parent.title}`;
//       },
//     },
//   };
export default resolvers;
