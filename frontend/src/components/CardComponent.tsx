import { Card, CardActionArea, CardMedia, CardContent, Typography, CardActions, Button } from "@mui/material";
import { IMovie } from "../interfaces/movie.interface";
import { useNavigate } from "react-router-dom";

const CardComponent = ({ movie }: { movie: IMovie }) => {
    const navigate = useNavigate();

    const handleShowDetails = () => {
        navigate(`/movie/${movie.id}`);
    };
    return (
        <Card sx={{ maxWidth: 200 }}>
            <CardActionArea onClick={handleShowDetails}>
                <CardMedia
                    component="img"
                    src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                    alt={movie.title}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {movie.title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        {movie.release_date}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button size="small" color="primary">
                    More Deatails
                </Button>
            </CardActions>
        </Card>
    );
};

export default CardComponent;
