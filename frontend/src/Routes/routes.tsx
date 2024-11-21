import {createBrowserRouter} from "react-router-dom";

import {ErrorPage} from "../components/ErrorPage";
import {AuthRoutes} from "./AuthRoutes/AuthRoutes";
import Homepage from "../components/Homepage/Homepage";
import {PokemonsRoutes} from "./PokemonRoutes/PokemonRoutes";
import {ProtectedRoute} from "./ProtectedRoute";
import {PublicRoute} from "./PublicRoute";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Homepage/>,
    },
    {
        path: '/',
        element: <PublicRoute/>,
        children: AuthRoutes
    },
    {
        path: "/pokemons",
        element: <ProtectedRoute/>,
        children: PokemonsRoutes,
    },
    {
        path: "*", // This catches all undefined routes
        element: <ErrorPage/>, // Render the ErrorPage component
    },
]);