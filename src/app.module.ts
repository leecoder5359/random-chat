import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { setTypeormMongo } from './lib/settings/set-typeorm-mongo';
import { ChatsModule } from './chats/chats.module';
import { SocketsModule } from './sockets/sockets.module';
import mongoConfig from './config/mongo.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [mongoConfig],
    }),
    TypeOrmModule.forRootAsync(setTypeormMongo),
    ChatsModule,
    SocketsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
