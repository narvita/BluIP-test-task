import axios from "axios";
import { INote } from "../../interfaces/note.interface";

const BASE_URL = `${process.env.REACT_APP_SERVER_URL}/notes`;

export const getNotesByMovieId = async (movieId: number): Promise<INote[]> => {
  const res = await axios.get(`${BASE_URL}/${movieId}`);
  return res.data;
};

export const addNote = async (movieId: number, content: string): Promise<INote> => {
  const res = await axios.post(BASE_URL, { movieId, content });
  return res.data;
};

export const deleteNote = async (id: string) => {
  await axios.delete(`${BASE_URL}/${id}`);
};
