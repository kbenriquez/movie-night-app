package com.example.movieapp.service;

import com.example.movieapp.cache.MovieCache;
import com.example.movieapp.model.*;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

// Marks this as a business service
@Service
public class MovieService {

    // Securely injected from environment variable
    @Value("${tmdb.api.key}")
    private String apiKey;

    private final HttpClient client = HttpClient.newHttpClient();
    private final ObjectMapper mapper = new ObjectMapper();

    public PagedResponse<Movie> getPopularMovies(int page) throws Exception {

        // Return cached result if available
        if (MovieCache.popularCache.containsKey(page)) {
            return MovieCache.popularCache.get(page);
        }

        // Build request URL
        String url = "https://api.themoviedb.org/3/movie/popular?page=" + page;

        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(url))
                .header("Authorization", "Bearer " + apiKey)
                .GET()
                .build();

        // Execute HTTP request
        String json = client.send(request, HttpResponse.BodyHandlers.ofString()).body();

        // Convert JSON → Java object
        PagedResponse<Movie> response =
                mapper.readValue(json, PagedResponse.class);

        // Cache result
        MovieCache.popularCache.put(page, response);

        return response;
    }
}
