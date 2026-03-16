import React from "react"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MovieCard from "../components/MovieCard";
import { getFavorites } from "../utils/favorites";

function Favorites() {
    const [favorites, setFavorites] = useState([]);
    const navigate = useNavigate();

    /**
     * Load favorites from localStorage once when page mounts
     */
    useEffect(() => {
        setFavorites(getFavorites());
    }, []);

    return (
        <div className="movie-page">
            <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
                ❤️ Your Favorites
            </h2>

            {favorites.length === 0 ? (
                <p style={{ textAlign: "center", opacity: 0.7 }}>
                    You haven’t added any favorites yet.
                </p>
            ) : (
                <div className="movie-grid">
                    {favorites.map((movie) => (
                        <MovieCard
                            key={movie.id}
                            movie={movie}
                            onClick={() => navigate(`/movie/${movie.id}`)}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

export default Favorites;
