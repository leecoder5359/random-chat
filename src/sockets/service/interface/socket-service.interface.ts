import { Socket } from 'socket.io';

export const SOCKET_SERVICE = Symbol('SOCKET_SERVICE');

export interface ISocketService {
  entranceUser(socket: Socket, userName: string): Promise<void>;
  submitChat(socket: Socket, message: string): Promise<void>;
  exitUser(socket: Socket): Promise<void>;
}
