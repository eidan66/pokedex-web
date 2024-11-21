import React from "react";
import { useNavigate } from "react-router-dom";
import "./Homepage.css";

const Homepage: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="homepage">
            <header className="homepage-header">
                <h1>Welcome to Pokemon App</h1>
                <p>Your favorite pokemon app!.</p>
            </header>
            <div className="homepage-buttons">
                <button className="btn btn-login" onClick={() => navigate("/login")}>
                    Login
                </button>
                <button className="btn btn-signup" onClick={() => navigate("/signup")}>
                    Signup
                </button>
            </div>
        </div>
    );
};

export default Homepage;