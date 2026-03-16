package com.example.movieapp;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

// Marks this as a Spring Boot application
@SpringBootApplication
public class MovieAppApplication {

    // Application entry point
    public static void main(String[] args) {

        // Bootstraps Spring, starts embedded server (Tomcat)
        SpringApplication.run(MovieAppApplication.class, args);
    }
}
