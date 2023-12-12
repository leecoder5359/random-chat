import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { setTypeormMongo } from './lib/settings/set-typeorm-mongo';
import mongoConfig from './config/mongo.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [mongoConfig],
    }),
    TypeOrmModule.forRootAsync(setTypeormMongo),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
