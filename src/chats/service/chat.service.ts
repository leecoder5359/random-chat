import { Inject, Injectable } from '@nestjs/common';
import { IChatService } from './interface/chat-service.interface';
import {
  CHAT_REPOSITORY,
  IChatRepository,
} from '../repository/interface/chat-repository.interface';

@Injectable()
export class ChatService implements IChatService {
  constructor(@Inject(CHAT_REPOSITORY) private repository: IChatRepository) {}

  async save(message: string, socketId: number): Promise<void> {
    await this.repository.save(message, socketId);
  }
}
