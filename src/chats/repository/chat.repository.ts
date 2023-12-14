import { Injectable } from '@nestjs/common';
import { IChatRepository } from './interface/chat-repository.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Chat } from './entity/chat.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ChatRepository implements IChatRepository {
  constructor(@InjectRepository(Chat) private repository: Repository<Chat>) {}
  async save(message: string, socketId: number): Promise<void> {
    const chat = this.repository.create({ message, socketId });
    await this.repository.save(chat);
  }
}
