import React, { FunctionComponent } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";
import "./Navbar.css";

export const Navbar: FunctionComponent = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    return (
        <nav className="navbar">
            <div className="navbar-left">
                <h1 onClick={() => navigate("/pokemons")} className="navbar-title">
                    Pokedex
                </h1>
            </div>
            <div className="navbar-center">
                <input
                    type="text"
                    placeholder="Search Pokémon..."
                    className="navbar-search"
                />
            </div>
            <div className="navbar-right">
                <div className="navbar-user">
                    {user && <span>{user.fullName}</span>}
                    <button onClick={handleLogout} className="navbar-logout">
                        Logout
                    </button>
                </div>
            </div>
        </nav>
    );
};