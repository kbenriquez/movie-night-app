// Key used in localStorage
const FAVORITES_KEY = "movie_favorites";

/**
 * Read favorites from localStorage
 * If nothing exists, return an empty array
 */
export function getFavorites() {
    const raw = localStorage.getItem(FAVORITES_KEY);
    return raw ? JSON.parse(raw) : [];
}

/**
 * Save favorites back to localStorage
 */
function saveFavorites(favorites) {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
}

/**
 * Toggle a movie as favorite
 */
export function toggleFavorite(movie) {
    const favorites = getFavorites();
    const exists = favorites.some((m) => m.id === movie.id);

    const updated = exists
        ? favorites.filter((m) => m.id !== movie.id)
        : [...favorites, movie];

    saveFavorites(updated);
    return updated;
}

/**
 * Check if a movie is favorited
 */
export function isFavorite(movieId) {
    return getFavorites().some((m) => m.id === movieId);
}
