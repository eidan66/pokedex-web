import { Controller, Get, Inject } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Controller('test-cache')
export class TestCacheController {
  constructor(
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache, // Use `any` to avoid type conflicts
  ) {}

  @Get('set')
  async setCache() {
    // Use dynamic typing for cacheManager
    await this.cacheManager.set('testKey', 'testValue');
    return { message: 'Cache set successfully' };
  }

  @Get('get')
  async getCache() {
    // Use dynamic typing for cacheManager
    const value = await this.cacheManager.get('testKey');
    return { value };
  }
}
