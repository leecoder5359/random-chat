import { Logger } from '@nestjs/common';
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

@WebSocketGateway()
export class ChatsGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(private logger: Logger) {}

  handleDisconnect(client: any) {
    this.logger.log('handleDisconnect.', client);
  }

  handleConnection(@ConnectedSocket() socket: Socket) {
    this.logger.log(`소켓 connected: ${socket.id} ${socket.nsp.name}`);
  }

  afterInit() {
    this.logger.log('init');
  }

  @SubscribeMessage('new_user')
  handleNewUser(
    @MessageBody() userName: string,
    @ConnectedSocket() socket: Socket,
  ) {
    const model = new newUserModel();
    socket.broadcast.emit('user_connected', userName);
    socket.emit('hello_user', `hello ${userName}`);
  }

  @SubscribeMessage('submit_chat')
  handleSubmitChat(
    @MessageBody() message: string,
    @ConnectedSocket() socket: Socket,
  ) {
    console.log(socket.id);
    console.log(message);

    socket.broadcast.emit('new_chat', {
      message,
      userName: socket.id,
    });
  }
}
