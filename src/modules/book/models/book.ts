import mongoose, { Model, Document } from "mongoose";

import { bookSchema } from "../../../bookSchema";

interface IBook extends Document {
  title: string;
  author: string;
  authorAndTitle?: string;
}
interface BookModel extends Model<IBook> {
  createBook({
    title,
    author,
  }: {
    title: string;
    author: string;
  }): Promise<IBook>;
  getBook({ bookId }: { bookId: string }): Promise<IBook>;

  updateBook({
    bookId,
    title,
    author,
  }: {
    bookId: string;
    title: string;
    author: string;
  }): Promise<IBook>;

  removeBook({ bookId }: { bookId: string }): Promise<IBook>;
}

class Book {
  static async createBook(
    this: BookModel,
    { title, author }: { title: string; author: string }
  ): Promise<IBook> {
    const doc = {
      title,
      author,
    };
    const book = await this.create(doc);
    return book;
  }
  static async getBook(this: BookModel, { title }: { title: string }) {
    const book = await this.findOne({ title: { $eq: title } });
    return book;
  }
  static async updateBook(
    this: BookModel,
    {
      bookId,
      title,
      author,
    }: {
      bookId: string;
      title: string;
      author: string;
    }
  ) {
    const book = await this.findByIdAndUpdate(
      {
        _id: { $eq: bookId },
      },
      { $set: { title, author } }
    );
    return book;
  }
  static async removeBook(this: BookModel, { bookId }: { bookId: string }) {
    const book = await this.deleteOne({ _id: { $eq: bookId } });
    return book;
  }
}
bookSchema.loadClass(Book);
export const Books: BookModel = mongoose.model<IBook, BookModel>(
  "Books",
  bookSchema
);
