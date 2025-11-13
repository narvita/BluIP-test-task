import express from 'express';
import cors from 'cors';
import notesRoutes from './routes/notes.routes';
import tmdbRoutes from './routes/tmdb.routes';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/tmdb', tmdbRoutes);
app.use('/api/notes', notesRoutes);

app.use("/api/notes", notesRoutes);

export default app;
