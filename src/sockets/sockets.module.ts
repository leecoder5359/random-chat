import { Module } from '@nestjs/common';
import { SOCKET_SERVICE } from './service/interface/socket-service.interface';
import { SocketService } from './service/socket.service';
import { SOCKET_REPOSITORY } from './repository/interface/socket-repository.interface';
import { SocketRepository } from './repository/socket.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Socket } from './repository/entity/socket.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Socket])],
  providers: [
    {
      provide: SOCKET_SERVICE,
      useClass: SocketService,
    },
    {
      provide: SOCKET_REPOSITORY,
      useClass: SocketRepository,
    },
  ],
  exports: [SOCKET_SERVICE],
})
export class SocketsModule {}
