import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Socket {
  @PrimaryGeneratedColumn()
  id: number;

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
}
