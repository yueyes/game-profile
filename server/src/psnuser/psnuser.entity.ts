import { User } from '@server/user/user.entity';
import {Entity,Column,PrimaryGeneratedColumn, Index, JoinColumn, ManyToOne, CreateDateColumn, UpdateDateColumn} from 'typeorm';

@Entity({name:'psnuser'})
@Index('psnuser_username_uindex', ['username'], {unique: true})
@Index('psnuser_user_id_fk', ['userId'])
export class Psnuser {
  @PrimaryGeneratedColumn()
  id: number;
  
  @ManyToOne(() => User, {onDelete: 'CASCADE'})
  @JoinColumn({name: 'user_id'})
  user: User;
  
  @Column()
  userId: number;
  
  @Column({type: 'text'})
  username : string;

  @Column({type: 'text', nullable:true})
  displayName : string;
  
  @Column({nullable: true, type: 'json'})
  remarks: Record<string, any>;
  
  @CreateDateColumn()
  createdAt: Date;
  
  @UpdateDateColumn()
  updatedAt: Date;
}