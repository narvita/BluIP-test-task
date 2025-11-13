import { NoteModel, INoteDocument } from "../models/Note";

export async function getNotesByMovieId(movieId: number): Promise<INoteDocument[]> {
  return NoteModel.find({ movieId }).sort({ createdAt: -1 }).exec();
}

export async function createNote(movieId: number, content: string): Promise<INoteDocument> {
  const note = new NoteModel({ movieId, content });
  return note.save();
}

export async function updateNote(id: string, content: string): Promise<INoteDocument | null> {
  return NoteModel.findByIdAndUpdate(id, { content }, { new: true });
}

export async function deleteNote(id: string): Promise<void> {
  await NoteModel.findByIdAndDelete(id);
}
