import React, {useState, useCallback} from "react";
import axios from "axios";

import "./SearchBar.css";
import {Pokemon} from "../../types/pokemon";

interface SearchBarProps {
    onSelectPokemon: (pokemonId: number) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({onSelectPokemon}) => {
    const [query, setQuery] = useState("");
    const [suggestions, setSuggestions] = useState<Pokemon[]>([]);
    const [isLoading, setIsLoading] = useState(false);


    const debounce = (func: Function, delay: number) => {
        let timer: NodeJS.Timeout;
        return (...args: any) => {
            clearTimeout(timer);
            timer = setTimeout(() => func(...args), delay);
        };
    };


    const fetchPokemonSuggestions = async (searchTerm: string) => {
        if (!searchTerm) {
            setSuggestions([]);
            return;
        }

        setIsLoading(true);

        try {
            const response = await axios.get(
                `http://localhost:8000/pokemon/search?query=${searchTerm}`
            );

            setSuggestions(response.data);
        } catch (error) {
            console.error("Error fetching Pokémon suggestions:", error);
        } finally {
            setIsLoading(false);
        }
    };


    const debouncedFetch = useCallback(debounce(fetchPokemonSuggestions, 300), []);


    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setQuery(value);
        debouncedFetch(value);
    };


    const handleSuggestionClick = (pokemon: Pokemon) => {
        const pokemonId = pokemon.id;
        if (pokemonId) {
            setQuery("");
            setSuggestions([]);
            onSelectPokemon(pokemonId);
        }
    };


    const handleClearSearch = () => {
        setQuery("");
        setSuggestions([]);
    };

    return (
        <div className="search-bar">
            <div className="search-wrapper">
                <i className="fas fa-search search-icon"></i> {/* Search Icon */}
                <input
                    type="text"
                    value={query}
                    onChange={handleInputChange}
                    placeholder="Search Pokémon..."
                    className="search-input"
                />
                {query && (
                    <i
                        className="fas fa-times clear-icon"
                        onClick={handleClearSearch}
                        aria-label="Clear search"
                    ></i>
                )}
                {isLoading && <div className="loading-spinner">Loading...</div>}
            </div>
            {suggestions.length > 0 && (
                <div className="suggestions-container">
                    <div className="suggestions-header">
                        <span>Suggestions</span>
                        <i
                            className="fas fa-times close-suggestions"
                            onClick={handleClearSearch}
                            aria-label="Close suggestions"
                        ></i>
                    </div>
                    <ul className="suggestions-list">
                        {suggestions.map((pokemon) => (
                            <li
                                key={pokemon.name}
                                onClick={() => handleSuggestionClick(pokemon)}
                                className="suggestion-item"
                            >
                                {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};