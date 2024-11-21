import React, {useEffect, useState} from "react";
import {useParams, useNavigate} from "react-router-dom";
import axios from "axios";

import "./PokemonDetails.css";
import {PokemonColors} from "../../../constants/pokemonColor";

interface PokemonDetailsProps {
    id: number;
    name: string;
    height: number;
    weight: number;
    abilities: { ability: { name: string } }[];
    types: { type: { name: string } }[];
    sprites: { other: { "official-artwork": { front_default: string } } };
    species: string;
    egg_groups: string[];
    hatch_counter: number;
}

export const PokemonDetails: React.FC = () => {
    const {id} = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [pokemon, setPokemon] = useState<PokemonDetailsProps | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchPokemonDetails = async () => {
            try {
                const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
                const speciesResponse = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${id}`);
                setPokemon({
                    id: response.data.id,
                    name: response.data.name,
                    height: response.data.height / 10, // Convert to meters
                    weight: response.data.weight / 10, // Convert to kilograms
                    abilities: response.data.abilities,
                    types: response.data.types,
                    sprites: response.data.sprites,
                    species: speciesResponse.data.genera.find((g: any) => g.language.name === "en").genus,
                    egg_groups: speciesResponse.data.egg_groups.map((group: any) => group.name),
                    hatch_counter: speciesResponse.data.hatch_counter,
                });
            } catch (err) {
                setError("Failed to load Pokémon details. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        fetchPokemonDetails();
    }, [id]);

    if (loading) {
        return <div className="loading">Loading...</div>;
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
            </div>
            <div className="details-body">
                <h2>About</h2>
                <p><strong>Species:</strong> {pokemon.species}</p>
                <p><strong>Height:</strong> {pokemon.height} m</p>
                <p><strong>Weight:</strong> {pokemon.weight} kg</p>
                <p><strong>Abilities:</strong> {pokemon.abilities.map(a => a.ability.name).join(", ")}</p>
                <h2>Breeding</h2>
                <p><strong>Egg Groups:</strong> {pokemon.egg_groups.join(", ")}</p>
                <p><strong>Egg Cycle:</strong> Steps to hatch: {255 * (pokemon.hatch_counter + 1)}</p>
            </div>
        </div>
    );
};
