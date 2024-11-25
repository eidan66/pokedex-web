import { Controller, Get, Query, Param } from '@nestjs/common';
import { PokemonService } from './pokemon.service';

@Controller('pokemon')
export class PokemonController {
  constructor(private readonly pokemonService: PokemonService) {}

  @Get()
  async findAll(
    @Query('limit') limit: string = '20',
    @Query('offset') offset: string = '0',
  ) {
    return this.pokemonService.findAll(parseInt(limit), parseInt(offset));
  }

  @Get('search')
  async search(@Query('query') query: string) {
    return this.pokemonService.search(query);
  }

  @Get(':idOrName')
  async findOne(@Param('idOrName') idOrName: string) {
    return this.pokemonService.findOne(idOrName);
  }
}
