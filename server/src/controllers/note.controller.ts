import { Request, Response, NextFunction } from "express";
import * as notesService from "../services/notes.service";
import { ApiError } from "../utils/apiError";

export async function getNotesHandler(req: Request, res: Response, next: NextFunction) {
  const movieId = parseInt(req.params.movieId);
  if (isNaN(movieId)) return next(new ApiError(400, "Invalid movieId"));

  try {
    const notes = await notesService.getNotesByMovieId(movieId);
    res.json(notes);
  } catch (err) {
    next(err);
  }
}

export async function createNoteHandler(req: Request, res: Response, next: NextFunction) {
  const { movieId, content } = req.body;
  if (!movieId || !content) return next(new ApiError(400, "movieId and content are required"));

  try {
    const note = await notesService.createNote(movieId, content);
    res.status(201).json(note);
  } catch (err) {
    next(err);
  }
}

export async function updateNoteHandler(req: Request, res: Response, next: NextFunction) {
  const { id } = req.params;
  const { content } = req.body;
  if (!content) return next(new ApiError(400, "Content is required"));

  try {
    const updated = await notesService.updateNote(id, content);
    if (!updated) return next(new ApiError(404, "Note not found"));
    res.json(updated);
  } catch (err) {
    next(err);
  }
}

export async function deleteNoteHandler(req: Request, res: Response, next: NextFunction) {
  const { id } = req.params;
  try {
    await notesService.deleteNote(id);
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    next(err);
  }
}
