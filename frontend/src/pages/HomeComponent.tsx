import { useEffect, useState } from "react";
import { IMovie } from "../interfaces/movie.interface";
import { getPopularMovies } from "../api/services/movies.service";
import { Box, Grid, Typography } from "@mui/material";
import CardComponent from "../components/CardComponent";

const HomeComponent = () => {
  const [movies, setMovies] = useState<IMovie[]>([]);

  useEffect(() => {
    getPopularMovies().then(setMovies);
  }, []);

  return (
    <Box sx={{ marginTop: "20px", padding: " 10px" }}>
      <Typography
        variant="h6"

        sx={{
          flexGrow: 1,
          display: { xs: 'none', sm: 'block' },
          cursor: 'pointer',
          '&:hover': { opacity: 0.8 },
        }}>Popular Movies</Typography>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", width: "100%" }}>
        <Box sx={{ width: '100%', height: '600px', padding: "20px" }}>
          <Grid container rowSpacing={1} spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
            {movies.map((movie) => (

              <Grid size={4} key={movie.id}>
                <CardComponent movie={movie} />
              </Grid>

            ))}

          </Grid>

        </Box>

      </div>
    </Box>
  );
};

export default HomeComponent;
