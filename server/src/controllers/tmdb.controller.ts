import { Request, Response, NextFunction } from 'express';
import * as tmdbService from '../services/tmdb.service';
import { ApiError } from '../utils/apiError';

export async function searchMovies(req: Request, res: Response, next: NextFunction) {
    const query = req.query.name as string;
    if (!query) return next(new ApiError(400, 'Query is required'));
    try {
        const results = await tmdbService.searchMovies(query);
        res.json(results);
    } catch (err) {
        next(err);
    }
}

export async function getMovieDetails(req: Request, res: Response, next: NextFunction) {
    const id = req.params.id;
    const movieId = parseInt(id);
    if (!id || isNaN(movieId)) {
        return next(new ApiError(400, `Invalid movieId: ${id}`));
    }

    try {
        const movie = await tmdbService.getMovieDetails(movieId);
        res.json(movie);
    } catch (err) {
        next(err);
    }
}


export async function getPopularMovies(req: Request, res: Response, next: NextFunction) {
    const limit = parseInt(req.query.limit as string) || 10;
    try {
        const movies = await tmdbService.getPopularMovies(limit);
        res.json(movies);
    } catch (err) {
        next(err);
    }
}

