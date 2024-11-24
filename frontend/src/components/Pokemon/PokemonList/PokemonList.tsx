import React, {FunctionComponent, useEffect, useState, useRef} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";

import "./PokemonList.css";
import {PokemonColors} from "../../../constants/pokemonColor";
import {Loader} from "../../Loader";
import {PokemonTypes} from "../PokemonTypes";
import {Pokemon} from "../../../types/pokemon";


export const PokemonList: FunctionComponent = () => {
    const [pokemons, setPokemons] = useState<Pokemon[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [offset, setOffset] = useState(0);
    const hasFetchedRef = useRef(false);

    const navigate = useNavigate();

    const handleCardClick = (id: number) => {
        navigate(`/pokemons/${id}`);
    };

    const fetchPokemons = async () => {
        try {
            if (loading) return;

            setLoading(true);
            const response = await axios.get(
                `http://localhost:8000/pokemon?offset=${offset}&limit=20`
            );


            setPokemons((prev) => [...prev, ...response.data]);

            setOffset((prev) => prev + 20);
        } catch (err) {
            setError("Failed to fetch Pokémon data. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!hasFetchedRef.current) {
            fetchPokemons();
            hasFetchedRef.current = true;
        }
    }, []);

    if (error) {
        return <div className="error">{error}</div>;
    }

    return (
        <div>
            <div className="pokemon-list">
                {pokemons.map((pokemon) => (
                    <div
                        key={`${pokemon.id}${pokemon.name}`}
                        className="pokemon-card"
                        onClick={() => handleCardClick(pokemon.id)}
                        style={{
                            backgroundColor: `${PokemonColors[pokemon.types[0].type.name as keyof typeof PokemonColors]}80`,
                        }}
                    >
                        <div className="pokemon-header">
                            <h2>
                                {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
                            </h2>
                            <span>#{String(pokemon.id).padStart(3, "0")}</span>
                        </div>
                        <img
                            src={pokemon.sprites.other["official-artwork"].front_default}
                            alt={pokemon.name}
                            className="pokemon-image"
                        />
                        <PokemonTypes types={pokemon.types}/>
                    </div>
                ))}
            </div>

            <div className="pagination">
                {loading ? (
                    <Loader/>
                ) : (
                    <button onClick={fetchPokemons} className="load-more">
                        Load More
                    </button>
                )}
            </div>
        </div>
    );
};