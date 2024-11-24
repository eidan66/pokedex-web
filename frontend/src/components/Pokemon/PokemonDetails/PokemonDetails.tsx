import React, {useEffect, useState} from "react";
import {useParams, useNavigate} from "react-router-dom";
import axios from "axios";

import "./PokemonDetails.css";
import {PokemonColors} from "../../../constants/pokemonColor";
import {Loader} from "../../Loader";
import {PokemonTypes} from "../PokemonTypes";
import { PokemonDetails as IPokemonDetails} from "../../../types/pokemon";


export const PokemonDetails: React.FC = () => {
    const {id} = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [pokemon, setPokemon] = useState<IPokemonDetails | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchPokemonDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/pokemon/${id}`);
                setPokemon(response.data);
            } catch (err) {
                setError("Failed to load Pokémon details. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        fetchPokemonDetails();
    }, [id]);

    if (loading) {
        return <Loader/>
    }

    if (error) {
        return <div className="error">{error}</div>;
    }

    if (!pokemon) {
        return <div className="error">No Pokémon found.</div>;
    }

    return (
        <div className="pokemon-details">
            <button onClick={() => navigate(-1)} className="back-button">Go Back</button>
            <div className="details-header"
                 style={{backgroundColor: `${PokemonColors[pokemon.types[0].type.name as keyof typeof PokemonColors]}80`}}>
                <h1>{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h1>
                <span>#{String(pokemon.id).padStart(3, "0")}</span>
                <img
                    src={pokemon.sprites.other["official-artwork"].front_default}
                    alt={pokemon.name}
                    className="pokemon-details-image"
                />
                <PokemonTypes types={pokemon.types} />
            </div>
            <div className="details-body">
                <h2>About</h2>
                <p><strong>Species:</strong> {pokemon.species.name}</p>
                <p><strong>Height:</strong> {pokemon.height}m</p>
                <p><strong>Weight:</strong> {pokemon.weight}kg</p>
                <p><strong>Abilities:</strong> {pokemon.abilities.map(a => a.ability.name).join(", ")}</p>
                <h2>Breeding</h2>
                <p><strong>Egg Groups:</strong> {pokemon.egg_groups.join(", ")}</p>
                <p><strong>Egg Cycle:</strong> Steps to hatch: {255 * (pokemon.hatch_counter + 1)}</p>
            </div>
        </div>
    );
};
