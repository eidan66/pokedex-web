import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import axios from 'axios';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

import { Pokemon } from './entities/pokemon.entity';

@Injectable()
export class PokemonService {
  private readonly baseUrl = 'https://pokeapi.co/api/v2';
  private readonly pokemonUrl = `${this.baseUrl}/pokemon`;

  constructor(@Inject(CACHE_MANAGER) private readonly cacheManager: Cache) {}

  async findAll(limit: number, offset: number) {
    const cacheKey = `pokemons:limit=${limit}:offset=${offset}`;
    const cachedData = await this.cacheManager.get<Pokemon[]>(cacheKey);

    if (cachedData) {
      return cachedData;
    }

    try {
      const response = await axios.get(this.pokemonUrl, {
        params: { limit, offset },
      });

      const detailedResults = await Promise.all(
        response.data.results.map(async (pokemon: any) => {
          const details = await axios.get(pokemon.url);
          return details.data;
        }),
      );

      detailedResults.sort((a, b) => a.id - b.id);

      await this.cacheManager.set(cacheKey, detailedResults);
      return detailedResults;
    } catch (error) {
      console.error(error);
      throw new HttpException(
        'Failed to fetch Pokémon data',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOne(idOrName: string) {
    const cacheKey = `pokemon:${idOrName}`;
    const cachedData = await this.cacheManager.get<Pokemon>(cacheKey);

    if (cachedData) {
      return cachedData;
    }

    try {
      const response = await axios.get(`${this.pokemonUrl}/${idOrName}`);
      const speciesResponse = await axios.get(
        `${this.baseUrl}/pokemon-species/${idOrName}`,
      );

      const pokemonDetails = {
        id: response.data.id,
        name: response.data.name,
        height: response.data.height / 10, // Convert to meters
        weight: response.data.weight / 10, // Convert to kilograms
        abilities: response.data.abilities,
        types: response.data.types,
        sprites: response.data.sprites,
        species: speciesResponse.data.genera.find(
          (g: any) => g.language.name === 'en',
        ).genus,
        egg_groups: speciesResponse.data.egg_groups.map(
          (group: any) => group.name,
        ),
        hatch_counter: speciesResponse.data.hatch_counter,
      };

      await this.cacheManager.set(cacheKey, pokemonDetails);

      return pokemonDetails;

      // return response.data;
    } catch (error) {
      if (error.response?.status === 404) {
        throw new HttpException('Pokémon not found', HttpStatus.NOT_FOUND);
      }
      throw new HttpException(
        'Failed to fetch Pokémon',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async search(query: string) {
    if (!query) {
      return [];
    }

    try {
      const cacheKey = `search:${query}`;
      const cachedData = await this.cacheManager.get<Pokemon[]>(cacheKey);

      if (cachedData) {
        return cachedData;
      }

      const response = await axios.get(this.pokemonUrl, {
        params: { limit: 1500 },
      });

      const filteredResults = response.data.results.filter((pokemon: any) =>
        pokemon.name.toLowerCase().includes(query.toLowerCase()),
      );

      const detailedResults = await Promise.all(
        filteredResults.map(async (pokemon: any) => {
          const details = await axios.get(pokemon.url);
          return details.data;
        }),
      );

      await this.cacheManager.set(cacheKey, detailedResults.slice(0, 10));

      return detailedResults.slice(0, 10);
    } catch (error) {
      console.error('Error in search function:', error.message);
      throw new HttpException(
        'Failed to search Pokémon',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
