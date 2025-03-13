import { Books } from "../models/book";
export const bookMutations = {
  bookAdd: (_parent: undefined, args: { title: string; author: string }) => {
    Books.createBook(args);

    return "Nom amjilttai nemlee";
  },
  bookDelete: (_parent: undefined, args: { bookId: string }) => {
    Books.removeBook(args);

    return "nom amjilttai hasagdlaa";
  },
  bookUpdate: (
    _parent: undefined,
    args: { bookId: string; title: string; author: string }
  ) => {
    Books.updateBook(args);
    return "succeessfully updated";
  },
};
