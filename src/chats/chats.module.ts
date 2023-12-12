import { Logger, Module } from '@nestjs/common';
import { ChatsGateway } from './chats.gateway';
import { CHAT_SERVICE } from './service/interface/chat-service.interface';
import { ChatService } from './service/chat.service';
import { CHAT_REPOSITORY } from './repository/interface/chat-repository.interface';
import { ChatRepository } from './repository/chat.repository';
import { Socket } from '../sockets/repository/entity/socket.entity';
import { Chat } from './repository/entity/chat.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Chat, Socket])],
  providers: [
    ChatsGateway,
    Logger,
    {
      provide: CHAT_SERVICE,
      useClass: ChatService,
    },
    {
      provide: CHAT_REPOSITORY,
      useClass: ChatRepository,
    },
  ],
})
export class ChatsModule {}
