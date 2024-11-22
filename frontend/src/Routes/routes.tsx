import {createBrowserRouter} from "react-router-dom";

import {ErrorPage} from "../components/ErrorPage";
import {AuthRoutes} from "./AuthRoutes/AuthRoutes";
import Homepage from "../components/Homepage/Homepage";
import {PokemonsRoutes} from "./PokemonRoutes/PokemonRoutes";
import {ProtectedRoute} from "./ProtectedRoute";
import {PublicRoute} from "./PublicRoute";

const basename = "/pokedex-web";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Homepage/>,
        errorElement: <ErrorPage/>
    },
    {
        path: "/",
        element: <PublicRoute/>,
        children: AuthRoutes,
        errorElement: <ErrorPage/>
    },
    {
        path: "/pokemons",
        element: <ProtectedRoute/>,
        children: PokemonsRoutes,
        errorElement: <ErrorPage/>
    },
    {
        path: "*",
        element: <ErrorPage/>,
    },
], {basename});