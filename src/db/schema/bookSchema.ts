import mongoose from "mongoose";
const schema = mongoose.Schema;

export const bookSchema = new schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    authorId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true, collection: "books" }
);
