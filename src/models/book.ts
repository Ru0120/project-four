import mongoose, { Document, Schema } from "mongoose";

export interface IBook extends Document {
  title: string;
  author: string;
}

const bookSchema = new Schema<IBook>({
  title: { type: String, required: true },
  author: { type: String, required: true },
});

export const Books = mongoose.model<IBook>("book", bookSchema);
