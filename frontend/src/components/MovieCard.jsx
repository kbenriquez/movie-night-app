import React from 'react'
import { useState } from "react";
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { toggleFavorite, isFavorite } from "../utils/favorites";
import { IMAGE_BASE_URL } from "../api/tmdbApi";
import "../styles/MovieCard.css";


function MovieCard({ movie, onClick }) {
    const navigate = useNavigate();
    const [favorite, setFavorite] = useState(isFavorite(movie.id));

    function handleFavorite(e) {
        e.stopPropagation(); // prevents navigation
        toggleFavorite(movie);
        setFavorite(!favorite);
    }

    return (
        /*
          motion.div allows hover & tap animations
        */
        <motion.div
            whileHover={{ scale: 1.05 }}
            onClick={onClick}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="movie-card"
        >
            <motion.img
                src={
                    movie.poster_path
                        ? `${IMAGE_BASE_URL}${movie.poster_path}`
                        : "/placeholder.png"
                }
                alt={movie.title}
                style={{ width: '100%' }}
                whileHover={{ scale: 1.03 }}
            />

            <h3>{movie.title}</h3>
            <p>⭐ {movie.vote_average}</p>
            <button className="favorite-btn" onClick={handleFavorite}>
                {favorite ? "❤️" : "🤍"}
            </button>
        </motion.div>
    )
}

export default MovieCard
