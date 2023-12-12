import { Injectable } from '@nestjs/common';
import { IChatRepository } from './interface/chat-repository.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Chat } from './entity/chat.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ChatRepository implements IChatRepository {
  constructor(@InjectRepository(Chat) repository: Repository<Chat>) {}
}
