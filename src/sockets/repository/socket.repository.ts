import { Injectable, NotFoundException } from '@nestjs/common';
import { ISocketRepository } from './interface/socket-repository.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Socket } from './entity/socket.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SocketRepository implements ISocketRepository {
  constructor(
    @InjectRepository(Socket) private repository: Repository<Socket>,
  ) {}

  async deleteOneBySocketId(socketId: string): Promise<Socket> {
    const socket = await this.repository.findOne({
      where: { socketId },
      select: ['socketId', 'userName'],
    });

    if (!socket) {
      throw new NotFoundException(`Socket with ID ${socketId} not found`);
    }
    console.log('deleted socket', socket);
    await this.repository.delete(socket);
    return socket;
  }

  async save(id: string, userName: string): Promise<void> {
    const socket = this.repository.create({
      socketId: id,
      userName,
    });

    console.log('created socket', socket);

    await this.repository.save(socket);
  }

  async existUserName(userName: string): Promise<boolean> {
    return this.repository.exist({ where: { userName } });
  }

  findOneBySocketId(socketId: string): Promise<Socket> {
    return this.repository.findOneBy({ socketId });
  }
}
