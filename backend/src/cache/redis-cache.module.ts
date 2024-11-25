import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { ioRedisStore } from '@tirke/node-cache-manager-ioredis';

@Module({
  imports: [
    CacheModule.registerAsync({
      isGlobal: true,
      useFactory: () => ({
        store: ioRedisStore,
        host: process.env.REDIS_HOST || 'redis://127.0.0.1:6379/0',
        port: parseInt(process.env.REDIS_PORT) || 6379,
        ttl: parseInt(process.env.REDIS_TTL) || 300,
      }),
    }),
  ],
  exports: [CacheModule],
})
export class RedisCacheModule {}
