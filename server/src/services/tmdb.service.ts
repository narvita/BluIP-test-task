import axios from 'axios';
import { config } from '../config';

const TMDB_BASE = 'https://api.themoviedb.org/3';

export async function searchMovies(query: string) {
    const response = await axios.get(`${TMDB_BASE}/search/movie`, {
        params: { api_key: config.tmdbApiKey, query },
    });
    
    return response.data.results;
}

export async function getMovieDetails(movieId: number) {
    const response = await axios.get(`${TMDB_BASE}/movie/${movieId}`, {
        params: { api_key: config.tmdbApiKey },
    });
    return response.data;
}

export async function getPopularMovies(limit = 10) {
    const response = await axios.get(`${TMDB_BASE}/movie/popular`, {
        params: { api_key: config.tmdbApiKey, page: 1 },
    });
    return response.data.results.slice(0, limit);
}
