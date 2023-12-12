import { Column, Entity, ObjectId, ObjectIdColumn, OneToMany } from 'typeorm';
import { Chat } from '../../../chats/repository/entity/chat.entity';

@Entity()
export class Socket {
  @ObjectIdColumn({ generated: 'uuid' })
  id: ObjectId;

  @Column({
    type: 'varchar',
    unique: true,
    length: 70,
    comment: '소켓 id',
    nullable: false,
  })
  socketId: string;

  @Column({
    name: 'user_name',
    type: 'varchar',
    length: 30,
    comment: '사용자 이름',
    nullable: false,
  })
  userName: string;

  @OneToMany(() => Chat, (chat) => chat.id)
  chatId: Chat[];
}
