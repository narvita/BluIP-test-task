import React, { createContext, useContext, useState, ReactNode } from "react";
import { INote } from "../interfaces/note.interface";

interface NotesContextProps {
    notes: INote[];
    addNote: (note: INote) => void;
    getNotesForMovie: (movieId: number) => INote[];
}

const NotesContext = createContext<NotesContextProps | undefined>(undefined);

export const NotesProvider = ({ children }: { children: ReactNode }) => {
    const [notes, setNotes] = useState<INote[]>([]);

    const addNote = (note: INote) => {
        setNotes((prev) => [...prev, note]);
    };

    const getNotesForMovie = (movieId: number) =>
        notes.filter((note) => note.movieId === movieId);

    return (
        <NotesContext.Provider value={{ notes, addNote, getNotesForMovie }}>
            {children}
        </NotesContext.Provider>
    );
};

export const useNotes = () => {
    const context = useContext(NotesContext);
    if (!context) throw new Error("useNotes must be used within NotesProvider");
    return context;
};
