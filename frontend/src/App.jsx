import React from "react";
import {useState} from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Header from "./components/Header";
import MovieList from "./pages/MovieList";
import MovieDetails from "./pages/MovieDetails";
import Favorites from "./pages/Favorites";

function App() {
    const location = useLocation();
    const [query, setQuery] = useState("");

    return (
        <>
            <Header onSearch={setQuery}/>

            <AnimatePresence mode="wait">
                <Routes location={location} key={location.pathname}>
                    <Route path="/" element={<MovieList query={query}/>} />
                    <Route path="/movie/:id" element={<MovieDetails />} />
                    <Route path="/favorites" element={<Favorites />} />
                </Routes>
            </AnimatePresence>
        </>
    );
}

export default App;
