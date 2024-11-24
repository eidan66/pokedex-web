import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class PokemonService {
  private readonly baseUrl = 'https://pokeapi.co/api/v2/pokemon';
  private readonly logger = new Logger(PokemonService.name);

  async findAll(limit: number, offset: number) {
    try {
      const response = await axios.get(this.baseUrl, {
        params: { limit, offset },
      });

      const detailedResults = await Promise.all(
        response.data.results.map(async (pokemon: any) => {
          const details = await axios.get(pokemon.url);
          return details.data;
        }),
      );

      detailedResults.sort((a, b) => a.id - b.id);

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
    try {
      const response = await axios.get(`${this.baseUrl}/${idOrName}`);
      return response.data;
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
      const response = await axios.get(this.baseUrl, {
        params: { limit: 1000 },
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
