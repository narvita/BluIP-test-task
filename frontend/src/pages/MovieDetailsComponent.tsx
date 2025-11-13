import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieDetails, } from "../api/services/movies.service";
import { getNotesByMovieId, addNote, deleteNote } from "../api/services/note.service";
import {
    Box, Typography, Chip, Stack, Button, Paper, TextField,
    CircularProgress, Alert, IconButton
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { IMovie } from "../interfaces/movie.interface";
import { INote } from "../interfaces/note.interface";

const MovieDetails = () => {
    const { id } = useParams();
    const [movie, setMovie] = useState<IMovie | null>(null);
    const [notes, setNotes] = useState<INote[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [noteText, setNoteText] = useState("");

    useEffect(() => {
        if (!id) return;

        const getMovieInfo = async () => {
            try {
                setLoading(true);
                const [movieData, notesData] = await Promise.all([
                    getMovieDetails(Number(id)),
                    getNotesByMovieId(Number(id)),
                ]);
                setMovie(movieData);
                setNotes(notesData);
            } catch {
                setError("Failed to load movie or notes");
            } finally {
                setLoading(false);
            }
        };

        getMovieInfo();
    }, [id]);

    const handleAddNote = async () => {
        if (!noteText || !movie) return;
        try {
            const newNote = await addNote(movie.id, noteText);
            setNotes([newNote, ...notes]);
            setNoteText("");
        } catch {
            setError("Failed to add note");
        }
    };

    const handleDeleteNote = async (noteId: string) => {
        try {
            await deleteNote(noteId);
            setNotes(notes.filter((n) => n._id !== noteId));
        } catch {
            setError("Failed to delete note");
        }
    };

    if (loading) return <CircularProgress sx={{ display: "block", mx: "auto", mt: 4 }} />;
    if (error) return <Alert severity="error">{error}</Alert>;
    if (!movie) return <Alert severity="info">Movie not found</Alert>;

    const backdropUrl = movie.backdrop_path ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}` : "";
    const posterUrl = movie.poster_path ? `https://image.tmdb.org/t/p/w300${movie.poster_path}` : "";

    return (
        <Box>
            <Box sx={{ position: "relative", height: 400 }}>
                {backdropUrl && (
                    <Box
                        sx={{
                            position: "absolute",
                            inset: 0,
                            backgroundImage: `url(${backdropUrl})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            filter: "blur(6px) brightness(0.5)",
                            zIndex: 0,
                        }}
                    />
                )}

                <Box
                    sx={{
                        position: "relative",
                        display: "flex",
                        alignItems: "center",
                        maxWidth: 1200,
                        mx: "auto",
                        px: 2,
                        height: "100%",
                        zIndex: 1,
                    }}
                >
                    <Box sx={{ flexShrink: 0 }}>
                        <img
                            src={posterUrl}
                            alt={movie.title}
                            style={{ width: 200, borderRadius: 8, boxShadow: "0 4px 12px rgba(0,0,0,0.5)" }}
                        />
                    </Box>
                    <Box sx={{ ml: 4, color: "white", maxWidth: 700 }}>
                        <Typography variant="h4">{movie.title} ({movie.release_date?.slice(0, 4)})</Typography>
                        <Typography variant="body2" mb={1}>
                            Rating: {movie.adult ? "TV-MA" : "PG-13"} | Score: {movie.vote_average.toFixed(1)}
                        </Typography>
                        <Stack direction="row" spacing={1} mb={1}>
                            {movie.genres?.map((genre) => (
                                <Chip key={genre.id} label={genre.name} size="small"
                                    sx={{ color: "white", borderColor: "white", borderWidth: 1, borderStyle: "solid" }} />
                            ))}
                        </Stack>
                        <Typography variant="body1">{movie.overview}</Typography>
                    </Box>
                </Box>
            </Box>

            <Box sx={{ maxWidth: 800, mx: "auto", mt: 4, p: 2 }}>
                <Typography variant="h6" gutterBottom>Notes</Typography>
                <Stack spacing={2} mb={2}>
                    {notes.length === 0 && <Typography>No notes yet. Add your first note!</Typography>}
                    {notes.map((note) => (
                        <Paper key={note._id} sx={{ p: 2, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <Typography>{note.content}</Typography>
                            <IconButton color="error" onClick={() => handleDeleteNote(note._id)}><DeleteIcon /></IconButton>
                        </Paper>
                    ))}
                </Stack>
                <TextField
                    fullWidth
                    multiline
                    rows={3}
                    placeholder="Write a note..."
                    value={noteText}
                    onChange={(e) => setNoteText(e.target.value)}
                    sx={{ mb: 2 }}
                />
                <Button variant="contained" color="primary" onClick={handleAddNote}>Add Note</Button>
            </Box>
        </Box>
    );
};

export default MovieDetails;
