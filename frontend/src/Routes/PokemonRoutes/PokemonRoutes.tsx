import {PokemonList, PokemonsLayout} from "../../components/Pokemon";

export const PokemonsRoutes = [{
    path: "/pokemons",
    element: <PokemonsLayout/>,
    children: [
        {
            path: '',
            element: <PokemonList/>
        },

    ]
}]