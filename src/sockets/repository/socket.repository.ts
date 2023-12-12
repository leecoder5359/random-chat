import { Injectable } from '@nestjs/common';
import { ISocketRepository } from './interface/socket-repository.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Socket } from './entity/socket.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SocketRepository implements ISocketRepository {
  constructor(@InjectRepository(Socket) repository: Repository<Socket>) {}
}
