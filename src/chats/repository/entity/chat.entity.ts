import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Socket } from '../../../sockets/repository/entity/socket.entity';

@Entity()
export class Chat {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', comment: '메세지', nullable: false })
  message: string;

  @Column({ type: 'int', name: 'socket_id', nullable: true })
  socketId: number;
}
