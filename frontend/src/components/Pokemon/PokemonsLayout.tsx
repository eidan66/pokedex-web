import React from "react";
import { Outlet } from "react-router-dom";

import { Navbar } from "../Navbar";
import "./PokemonLayout.css"

export const PokemonsLayout: React.FC = () => {
    return (
        <div>
            <Navbar />
            <main>
                <Outlet />
            </main>
        </div>
    );
};