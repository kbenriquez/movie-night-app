package com.example.movieapp.controller;

import com.example.movieapp.model.PagedResponse;
import com.example.movieapp.model.Movie;
import com.example.movieapp.service.MovieService;
import org.springframework.web.bind.annotation.*;

// Allows frontend access
@CrossOrigin
@RestController
@RequestMapping("/api/movies")
public class MovieController {

    private final MovieService service;

    // Dependency injection
    public MovieController(MovieService service) {
        this.service = service;
    }

    // GET /api/movies/popular?page=1
    @GetMapping("/popular")
    public PagedResponse<Movie> popular(@RequestParam int page) throws Exception {
        return service.getPopularMovies(page);
    }
}
