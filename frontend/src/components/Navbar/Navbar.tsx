import React, { FunctionComponent, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";
import { SearchBar } from "../SearchBar";
import "./Navbar.css";

export const Navbar: FunctionComponent = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    const handleSearchSelect = (pokemonId: number) => {
        navigate(`/pokemons/${pokemonId}`);
        setIsMenuOpen(false);
    };

    const toggleMenu = () => {
        setIsMenuOpen((prev) => !prev);
    };

    return (
        <nav className="navbar">
            <div className="navbar-left">
                <h1 onClick={() => navigate("/pokemons")} className="navbar-title">
                    Pokédex
                </h1>
            </div>
            <button className="navbar-toggle" onClick={toggleMenu}>
                {isMenuOpen ? "✖" : "☰"}
            </button>
            <div className={`navbar-menu ${isMenuOpen ? "show" : ""}`}>
                <div className="navbar-center">
                    <SearchBar onSelectPokemon={handleSearchSelect} />
                </div>
                <div className="navbar-right">
                    <div className="navbar-user">
                        {user && <span>Hello, {user.fullName}!</span>}
                        <button onClick={handleLogout} className="navbar-logout">
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};