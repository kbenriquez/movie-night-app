package com.example.movieapp.model;

import java.util.List;

// Generic wrapper for paginated responses
public class PagedResponse<T> {

    private int page;
    private int totalPages;
    private List<T> results;

    public int getPage() { return page; }
    public void setPage(int page) { this.page = page; }

    public int getTotalPages() { return totalPages; }
    public void setTotalPages(int totalPages) { this.totalPages = totalPages; }

    public List<T> getResults() { return results; }
    public void setResults(List<T> results) { this.results = results; }
}
