import { Socket } from 'socket.io';

export const CHAT_SERVICE = Symbol('CHAT_SERVICE');

export interface IChatService {
  sendMessage(socket: Socket, message: string): void;
  entranceUser(socket: Socket, userName: string): void;
}
