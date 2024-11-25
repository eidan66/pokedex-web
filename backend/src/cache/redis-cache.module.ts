import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { ioRedisStore } from '@tirke/node-cache-manager-ioredis';

@Module({
  imports: [
    CacheModule.registerAsync({
      isGlobal: true, // Ensures it works globally across the app
      useFactory: () => ({
        store: ioRedisStore, // Specify the Redis store
        host: process.env.REDIS_HOST || 'localhost', // Default to localhost if not set
        port: parseInt(process.env.REDIS_PORT) || 6379, // Default Redis port
        ttl: parseInt(process.env.REDIS_TTL) || 300, // Time-to-live (in seconds)
      }),
    }),
  ],
  exports: [CacheModule],
})
export class RedisCacheModule {}
