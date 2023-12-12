import { Injectable } from '@nestjs/common';
import { ISocketService } from './interface/socket-service.interface';

@Injectable()
export class SocketService implements ISocketService {
  constructor() {}
}
