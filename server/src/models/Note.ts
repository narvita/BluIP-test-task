import { Schema, model, Document } from "mongoose";

export interface INoteDocument extends Document {
  movieId: number;
  content: string;
  createdAt: Date;
}

const noteSchema = new Schema<INoteDocument>(
  {
    movieId: { type: Number, required: true },
    content: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
  },
  { versionKey: false }
);

export const NoteModel = model<INoteDocument>("Note", noteSchema);
