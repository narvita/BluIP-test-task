import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { searchMovies } from "../api/services/movies.service";
import { IMovie } from "../interfaces/movie.interface";
import MovieCard from "../components/CardComponent";
import { Box } from "@mui/material";
import { Padding } from "@mui/icons-material";

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const SearchResults = () => {
    const [movies, setMovies] = useState<IMovie[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const name = useQuery().get("name") || "";

    useEffect(() => {
        if (!name) return;

        setLoading(true);
        searchMovies(name)
            .then((results) => setMovies(results))
            .catch((err) => setError(err.message))
            .finally(() => setLoading(false));
    }, [name]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p style={{ color: "red" }}>{error}</p>;

    return (
        <Box style={{ padding: "10px" }}>
            <h2>Search Results for "{name}"</h2>
            {movies.length === 0 ? (
                <p>No results found.</p>
            ) : (
                <Box style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
                    {movies.map((movie) => (
                        <MovieCard key={movie.id} movie={movie} />
                    ))}
                </Box>
            )}
        </Box>
    );
};

export default SearchResults;
