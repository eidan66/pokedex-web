import React, {FunctionComponent} from "react";
import {Navigate, Outlet} from "react-router-dom";

import {useAuth} from "../context/AuthContext";

export const ProtectedRoute: FunctionComponent = () => {
    const {isLoggedIn} = useAuth();

    return isLoggedIn ? <Outlet/> : <Navigate to="/login"/>;
};