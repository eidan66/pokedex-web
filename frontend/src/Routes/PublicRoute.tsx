import React, {FunctionComponent} from "react";
import {Navigate, Outlet} from "react-router-dom";

import {useAuth} from "../context/AuthContext";

export const PublicRoute: FunctionComponent = () => {
    const {isLoggedIn} = useAuth();

    return isLoggedIn ? <Navigate to="/pokemons"/> : <Outlet/>;
};