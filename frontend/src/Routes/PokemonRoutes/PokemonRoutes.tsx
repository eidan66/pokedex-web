import {PokemonList, PokemonsLayout} from "../../components/Pokemon";
import {PokemonDetails} from "../../components/Pokemon/PokemonDetails";

export const PokemonsRoutes = [{
    path: "/pokemons",
    element: <PokemonsLayout/>,
    children: [
        {
            path: '',
            element: <PokemonList/>
        },
        {
            path: ":id",
            element: <PokemonDetails/>
        },


    ]
}]