import { Controller, Get, Query, Param } from '@nestjs/common';
import { PokemonService } from './pokemon.service';

@Controller('pokemon') // Base route: /pokemon
export class PokemonController {
  constructor(private readonly pokemonService: PokemonService) {}

  // Get all Pokémon with pagination, including full details
  @Get()
  async findAll(
    @Query('limit') limit: string = '20',
    @Query('offset') offset: string = '0',
  ) {
    return this.pokemonService.findAll(parseInt(limit), parseInt(offset));
  }

  // Search Pokémon by name, including partial matches
  @Get('search')
  async search(@Query('query') query: string) {
    return this.pokemonService.search(query);
  }

  // Get a specific Pokémon by ID or name
  @Get(':idOrName')
  async findOne(@Param('idOrName') idOrName: string) {
    return this.pokemonService.findOne(idOrName);
  }
}
