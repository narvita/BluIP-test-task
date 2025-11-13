import { Router } from "express";
import {
    getNotesHandler,
    createNoteHandler,
    updateNoteHandler,
    deleteNoteHandler,
} from "../controllers/note.controller";

const router = Router();

router.get("/:movieId", getNotesHandler);
router.post("/", createNoteHandler);
router.put("/:id", updateNoteHandler);
router.delete("/:id", deleteNoteHandler);

export default router;
