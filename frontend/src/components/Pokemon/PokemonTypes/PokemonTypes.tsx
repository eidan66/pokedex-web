import React, {FunctionComponent} from "react";

import {PokemonType as IPokemonType} from "../../../types/pokemon";
import {PokemonColors} from "../../../constants/pokemonColor";
import './PokemonTypes.css'

interface PokemonTypesDetails {
    types: IPokemonType[]
}

export const PokemonTypes: FunctionComponent<PokemonTypesDetails> = ({types}) => {
    if (types?.length === 0) {
        return null
    }

    return (
        <div className="pokemon-types">
            {types.map((type: IPokemonType, index: number) => (
                <span
                    key={index}
                    className="pokemon-type"
                    style={{
                        backgroundColor:
                            PokemonColors[type.type.name as keyof typeof PokemonColors],
                    }}
                >
                  {type.type.name.charAt(0).toUpperCase() +
                      type.type.name.slice(1)}
                </span>
            ))}
        </div>
    )
}