import React from "react"
import { Link } from "react-router-dom";
import "../styles/Header.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Header({ onSearch }) {
    const [value, setValue] = useState("");
    const navigate = useNavigate();

    function handleChange(e) {
        setValue(e.target.value);
        navigate("/"); // always show results on home
        onSearch(e.target.value);
    }

    return (
        <header className="header">
            <Link to="/" className="logo">
                🎬 Kyle’s Movie Night
            </Link>

            <input
                type="text"
                placeholder="Search movies..."
                value={value}
                onChange={handleChange}
                className="search-input"
            />

            <nav className="nav">
                <Link to="/favorites">❤️ Favorites</Link>
            </nav>
        </header>
    );
}

export default Header;
