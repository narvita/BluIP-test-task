import axios from "axios";
import { IMovie } from "../../interfaces/movie.interface";

const BE_URL = `${process.env.REACT_APP_SERVER_URL}/tmdb`;

export const searchMovies = async (name: string): Promise<IMovie[]> => {
    const response = await axios.get(`${BE_URL}/search/`, {
        params: { name },
    });
    return response.data;
};

export const getPopularMovies = async (limit: number = 10): Promise<IMovie[]> => {
    const response = await axios.get(`${BE_URL}/popular`, {
        params: { limit },
    });
    return response.data;
};

export const getMovieDetails = async (id: number): Promise<IMovie> => {
    const response = await axios.get(`${BE_URL}/${id}`);
    return response.data;
};
