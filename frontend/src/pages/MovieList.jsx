import React, { useEffect, useState } from 'react'
import { fetchPopularMovies, searchMovies } from '../api/tmdbApi'
import MovieCard from '../components/MovieCard'
import "../styles/MovieList.css";
import {useNavigate} from "react-router-dom"
import { useDebounce } from "../hooks/useDebounce";

function MovieList({query}) {
    const [movies, setMovies] = useState([])
    const [page, setPage] = useState(1)
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();
    const debouncedQuery = useDebounce(query, 500);

    // Controls the animation for the whole grid
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.08, // delay between cards
            },
        },
    };

// Controls animation for each card
    const cardVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
    };

    useEffect(() => {
        async function loadMovies() {
            setLoading(true)
            const data = debouncedQuery
                ? await searchMovies(debouncedQuery, page)
                : await fetchPopularMovies(page);
            setMovies(data.results)
            setLoading(false)
        }

        loadMovies()
    }, [debouncedQuery, page]);

    return (
        <div className="movie-page">
            {/* Movie Grid */}
            <div className="movie-grid">
                {movies.map((movie) => (
                    <MovieCard
                        key={movie.id}
                        movie={movie}
                        onClick={() => navigate(`/movie/${movie.id}`)}
                    />
                ))}
            </div>

            {/* Pagination Controls */}
            <div className="pagination">
                <button
                    disabled={page === 1}
                    onClick={() => setPage((p) => p - 1)}
                >
                    ◀ Prev
                </button>

                <span>Page {page}</span>

                <button onClick={() => setPage((p) => p + 1)}>
                    Next ▶
                </button>
            </div>
        </div>
    );
}

export default MovieList
