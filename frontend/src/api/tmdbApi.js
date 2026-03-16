import axios from "axios";
import { getCached, setCached } from "./cache";

/**
 * Base TMDB API URL
 */
const BASE_URL = "https://api.themoviedb.org/3";

/**
 * API Key loaded from Vite environment variables
 */
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

/**
 * Base URL for images
 * Exported so components can use it
 */
export const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

const api = axios.create({
    baseURL: "https://api.themoviedb.org/3",
    params: {
        api_key: import.meta.env.VITE_TMDB_API_KEY
    }
});

/**
 * Fetch popular movies with caching
 */
export async function fetchPopularMovies(page = 1) {
    const cacheKey = `popular-${page}`;

    // 1. Check cache first
    const cached = getCached(cacheKey);
    if (cached) return cached;

    // 2. Fetch from TMDB if not cached
    const response = await axios.get(
        `${BASE_URL}/movie/popular`,
        { params: { api_key: API_KEY, page } }
    );

    // 3. Store in cache
    setCached(cacheKey, response.data);

    return response.data;
}

// Fetch detailed information for a single movie by ID
export async function fetchMovieDetails(movieId) {
    // Make a GET request to /movie/{id}
    const response = await api.get(`/movie/${movieId}`);

    // Return the full movie object
    return response.data;
}

export async function searchMovies(query, page = 1) {
    if (!query) return fetchPopularMovies(page);

    const cacheKey = `search-${query}-${page}`;
    const cached = getCached(cacheKey);
    if (cached) return cached;

    const response = await axios.get(`${BASE_URL}/search/movie`, {
        params: {
            api_key: API_KEY,
            query,
            page,
        },
    });

    setCached(cacheKey, response.data);
    return response.data;
}
