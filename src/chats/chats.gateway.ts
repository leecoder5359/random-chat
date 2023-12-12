import { Inject, Logger } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';
import {
  CHAT_SERVICE,
  IChatService,
} from './service/interface/chat-service.interface';

@WebSocketGateway()
export class ChatsGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(
    private logger: Logger,
    @Inject(CHAT_SERVICE) private chatService: IChatService,
  ) {}

  @SubscribeMessage('new_user')
  handleNewUser(
    @MessageBody() userName: string,
    @ConnectedSocket() socket: Socket,
  ) {
    this.chatService.entranceUser(socket, userName);
  }

  @SubscribeMessage('submit_chat')
  handleSubmitChat(
    @MessageBody() message: string,
    @ConnectedSocket() socket: Socket,
  ) {
    this.chatService.sendMessage(socket, message);
  }

  handleDisconnect(client: any) {
    this.logger.log('handleDisconnect.', client);
  }

  handleConnection(@ConnectedSocket() socket: Socket) {
    this.logger.log(`소켓 connected: ${socket.id} ${socket.nsp.name}`);
  }

  afterInit() {
    this.logger.log('init');
  }
}
