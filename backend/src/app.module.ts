import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PokemonModule } from './pokemon/pokemon.module';
import { RedisCacheModule } from './cache/redis-cache.module';

const __DEV__ = process.env.NODE_ENV === 'development';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: () => ({
        type: 'postgres',
        host: __DEV__ ? process.env.DB_HOST_DEV : process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT, 10) || 5432,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        autoLoadEntities: true,
        synchronize: __DEV__,
      }),
    }),
    RedisCacheModule,
    AuthModule,
    UserModule,
    PokemonModule,
  ],
})
export class AppModule {}
