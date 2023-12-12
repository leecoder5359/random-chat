import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  ObjectId,
  ObjectIdColumn,
} from 'typeorm';
import { Socket } from '../../../sockets/repository/entity/socket.entity';

@Entity()
export class Chat {
  @ObjectIdColumn({ generated: 'uuid' })
  id: ObjectId;

  @Column({ type: 'varchar', comment: '메세지', nullable: false })
  message: string;

  @ManyToOne(() => Socket, (socket) => socket.chatId)
  @JoinColumn({ name: 'socket_id' })
  socket: Socket;
}
