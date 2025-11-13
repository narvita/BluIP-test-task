import { Router } from 'express';
import { searchMovies, getPopularMovies, getMovieDetails } from '../controllers/tmdb.controller';

const router = Router();

router.get('/search', searchMovies);
router.get('/popular', getPopularMovies);

router.get('/:id', getMovieDetails);
export default router;
