import { Logger, Module } from '@nestjs/common';
import { SOCKET_SERVICE } from './service/interface/socket-service.interface';
import { SocketService } from './service/socket.service';
import { SOCKET_REPOSITORY } from './repository/interface/socket-repository.interface';
import { SocketRepository } from './repository/socket.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Socket } from './repository/entity/socket.entity';
import { SocketsGateway } from './sockets.gateway';
import { ChatsModule } from 'src/chats/chats.module';

@Module({
  imports: [TypeOrmModule.forFeature([Socket]), ChatsModule],
  providers: [
    {
      provide: SOCKET_SERVICE,
      useClass: SocketService,
    },
    {
      provide: SOCKET_REPOSITORY,
      useClass: SocketRepository,
    },
    SocketsGateway,
    Logger,
  ],
})
export class SocketsModule {}
