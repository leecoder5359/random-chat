import { Logger, Module } from '@nestjs/common';
import { CHAT_SERVICE } from './service/interface/chat-service.interface';
import { ChatService } from './service/chat.service';
import { CHAT_REPOSITORY } from './repository/interface/chat-repository.interface';
import { ChatRepository } from './repository/chat.repository';
import { Chat } from './repository/entity/chat.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Chat])],
  providers: [
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
  exports: [CHAT_SERVICE],
})
export class ChatsModule {}
