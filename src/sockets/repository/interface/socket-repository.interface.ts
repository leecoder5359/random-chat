import { Socket } from '../entity/socket.entity';

export const SOCKET_REPOSITORY = Symbol('SOCKET_REPOSITORY');

export interface ISocketRepository {
  deleteOneBySocketId(socketId: string): Promise<Socket>;
  save(id: string, userName: string): Promise<void>;
  existUserName(userName: string): Promise<boolean>;
  findOneBySocketId(socketId: string): Promise<Socket>;
}
