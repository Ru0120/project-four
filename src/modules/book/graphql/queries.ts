import { Context } from "../../../utils/@types";
import { checkLogin } from "../../../utils/checkLogin";
import { Books } from "../models/book";

export const bookQueries = {
  books: async () => {
    try {
      return await Books.find({});
    } catch (err) {
      throw new Error("Failed to fetch books");
    }
  },

  book: async (_parent: undefined, args: { title: string }) => {
    try {
      return await Books.findOne(args);
    } catch (err) {
      throw new Error("Failed to fetch book");
    }
  },
};
