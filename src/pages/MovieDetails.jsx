import movie from "./movie.json"
import styles from "./MovieDetails.module.css"
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { get } from "../utils/httpClient";
import { useState } from "react";

export function MovieDetails() {
    const {movieId} = useParams();
    const [movie, setMovie] = useState(null);
    
    useEffect(() => {
        get("/movie/" + movieId).then(data => {
            setMovie(data);

        })
    }, [movieId]);

    if (!movie) {
        return null;
    }

    const imageUrl = "https://image.tmdb.org/t/p/w500" + movie.poster_path;
    return (
    <div className={styles.detailsContainer}>
        <img className={styles.col + " " + styles.movieImage} 
        src={imageUrl} 
        alt={movie.title}
        />
        <div className={`${styles.col} ${styles.movieImage}`}>
            <p className={styles.firsItem}><strong>Title:</strong>  {movie.title}</p>
            <p><strong>Genres:</strong>{" "}
            {movie.genres.map(genre => genre.name).join(", ")}
            </p>
            <p><strong>Description:</strong> {movie.overview}</p>
            
        </div>
    </div>
    );
}