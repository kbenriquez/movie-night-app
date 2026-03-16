package com.example.movieapp.cache;

import com.example.movieapp.model.MovieDetails;
import com.example.movieapp.model.PagedResponse;
import com.example.movieapp.model.Movie;

import java.util.HashMap;
import java.util.Map;

// Simple in-memory session cache
public class MovieCache {

    // Cache popular movies by page number
    public static final Map<Integer, PagedResponse<Movie>> popularCache = new HashMap<>();

    // Cache movie details by movie ID
    public static final Map<Integer, MovieDetails> detailsCache = new HashMap<>();
}
