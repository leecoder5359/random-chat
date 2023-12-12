import { Logger, Module } from '@nestjs/common';
import { ChatsGateway } from './chats.gateway';

@Module({
  providers: [ChatsGateway, Logger],
})
export class ChatsModule {}
