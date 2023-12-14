import { Inject, Logger } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';
import {
  ISocketService,
  SOCKET_SERVICE,
} from './service/interface/socket-service.interface';

@WebSocketGateway()
export class SocketsGateway {
  constructor(
    private logger: Logger,
    @Inject(SOCKET_SERVICE) private socketService: ISocketService,
  ) {}

  @SubscribeMessage('new_user')
  handleNewUser(
    @MessageBody() userName: string,
    @ConnectedSocket() socket: Socket,
  ) {
    this.socketService.entranceUser(socket, userName);
  }

  @SubscribeMessage('submit_chat')
  handleSubmitChat(
    @MessageBody() message: string,
    @ConnectedSocket() socket: Socket,
  ) {
    this.socketService.submitChat(socket, message);
  }

  async handleDisconnect(@ConnectedSocket() socket: Socket) {
    await this.socketService.exitUser(socket);
    this.logger.log('handleDisconnect.', socket.id);
  }

  handleConnection(@ConnectedSocket() socket: Socket) {
    this.logger.log(`소켓 connected: ${socket.id} ${socket.nsp.name}`);
  }

  afterInit() {
    this.logger.log('init');
  }
}
