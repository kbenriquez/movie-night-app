package com.example.movieapp;

import com.example.movieapp.service.MovieService;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

// Tests business logic
public class MovieServiceTest {

    private final MovieService service = new MovieService();

    @Test
    void popularMoviesReturnsData() throws Exception {
        assertNotNull(service.getPopularMovies(1));
    }
}
