import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useParams, useNavigate } from 'react-router-dom'
import { fetchMovieDetails } from '../api/tmdbApi'
import "../styles/MovieDetails.css";

function MovieDetails() {
    const { id } = useParams()
    const navigate = useNavigate()
    const [movie, setMovie] = useState(null)

    useEffect(() => {
        async function loadMovie() {
            const data = await fetchMovieDetails(id)
            setMovie(data)
        }

        loadMovie()
    }, [id])

    if (!movie) return <p>Loading...</p>

    return (
        <div className="details-page">
            <div className="details-container">
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.4 }}
                >
                    <button onClick={() => navigate(-1)}>⬅ Back</button>

                    <h1>{movie.title}</h1>

                    <motion.img
                        src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                        alt={movie.title}
                        initial={{ scale: 0.9 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.4 }}
                    />

                    <p><strong>Release Date:</strong> {movie.release_date}</p>
                    <p><strong>Rating:</strong> ⭐ {movie.vote_average}</p>
                    <p>{movie.overview}</p>
                </motion.div>
            </div>
        </div>
    )
}

export default MovieDetails
