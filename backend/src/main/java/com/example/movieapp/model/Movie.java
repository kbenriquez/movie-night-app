package com.example.movieapp.model;

// Represents a basic movie card
public class Movie {

    // TMDB movie ID
    private int id;

    // Movie title
    private String title;

    // Short description
    private String overview;

    // Poster image path
    private String posterPath;

    // Getters & setters expose fields safely

    public int getId() { return id; }
    public void setId(int id) { this.id = id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getOverview() { return overview; }
    public void setOverview(String overview) { this.overview = overview; }

    public String getPosterPath() { return posterPath; }
    public void setPosterPath(String posterPath) { this.posterPath = posterPath; }
}
