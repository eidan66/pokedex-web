import React from "react";
import {useNavigate} from "react-router-dom";

import {useAuth} from "../../context/AuthContext";
import "./Homepage.css";

const Homepage: React.FC = () => {
    const navigate = useNavigate();
    const {isLoggedIn} = useAuth();

    return (
        <div className="homepage">
            <header className="homepage-header">
                <h1>Welcome to Pokemon App</h1>
                <p>Your favorite pokemon app!</p>
            </header>
            <div className="homepage-buttons">
                {!isLoggedIn ? (
                    <>
                        <button className="btn btn-login" onClick={() => navigate("/login")}>
                            Login
                        </button>
                        <button className="btn btn-signup" onClick={() => navigate("/signup")}>
                            Signup
                        </button>
                    </>
                ) : (
                    <button className="btn btn-pokemons" onClick={() => navigate("/pokemons")}>
                        View Pokémons
                    </button>
                )}
            </div>
        </div>
    );
};

export default Homepage;