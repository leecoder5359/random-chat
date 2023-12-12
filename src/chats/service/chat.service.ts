import { Inject, Injectable } from '@nestjs/common';
import { IChatService } from './interface/chat-service.interface';
import { Socket } from 'socket.io';
import {
  CHAT_REPOSITORY,
  IChatRepository,
} from '../repository/interface/chat-repository.interface';

@Injectable()
export class ChatService implements IChatService {
  constructor(@Inject(CHAT_REPOSITORY) repository: IChatRepository) {}

  sendMessage(socket: Socket, message: string): void {
    socket.broadcast.emit('new_chat', {
      message,
      userName: socket.id,
    });
  }

  entranceUser(socket: Socket, userName: string): void {
    socket.broadcast.emit('user_connected', userName);
    socket.emit('hello_user', `hello ${userName}`);
  }
}
