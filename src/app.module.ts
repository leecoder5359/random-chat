import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatsModule } from './chats/chats.module';
import { SocketsModule } from './sockets/sockets.module';
import postgresConfig from './config/postgres.config';
import { setTypeormPostgres } from './lib/settings/set-typeorm-postgres';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [postgresConfig],
    }),
    TypeOrmModule.forRootAsync(setTypeormPostgres),
    ChatsModule,
    SocketsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
