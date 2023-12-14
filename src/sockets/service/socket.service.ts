import { Inject, Injectable } from '@nestjs/common';
import { ISocketService } from './interface/socket-service.interface';
import { Socket } from 'socket.io';
import {
  CHAT_SERVICE,
  IChatService,
} from 'src/chats/service/interface/chat-service.interface';
import {
  ISocketRepository,
  SOCKET_REPOSITORY,
} from '../repository/interface/socket-repository.interface';

@Injectable()
export class SocketService implements ISocketService {
  private usedUserNames: Set<string> = new Set();

  constructor(
    @Inject(CHAT_SERVICE) private chatService: IChatService,
    @Inject(SOCKET_REPOSITORY) private socketRepository: ISocketRepository,
  ) {}

  async exitUser(socket: Socket): Promise<void> {
    const deletedSocket = await this.socketRepository.deleteOneBySocketId(
      socket.id,
    );

    console.log('deletedSocket', deletedSocket);
    if (deletedSocket) {
      socket.broadcast.emit('disconnect_user', deletedSocket.userName);
    }
  };

  async submitChat(socket: Socket, message: string): Promise<void> {
    const socketEntity = await this.socketRepository.findOneBySocketId(socket.id);

    await this.chatService.save(message, socketEntity.id);

    socket.broadcast.emit('new_chat', {
      message,
      userName: socketEntity.userName,
    });
  }

  async entranceUser(socket: Socket, userName: string): Promise<void> {
    const isExistUserName = await this.existUserName(userName);

    if (isExistUserName) {
      userName = this.generateUniqueUserName(userName);
    }

    await this.socketRepository.save(socket.id, userName);

    socket.broadcast.emit('user_connected', userName);
    socket.emit('hello_user', `hello ${userName}`);
  }

  private existUserName(userName: string): Promise<boolean> {
    return this.socketRepository.existUserName(userName);
  }

  private generateUniqueUserName(userName: string): string {
    do {
      userName += Math.floor(Math.random() * 1000);
    } while (this.usedUserNames.has(userName));

    this.usedUserNames.add(userName);
    return userName;
  }
}
