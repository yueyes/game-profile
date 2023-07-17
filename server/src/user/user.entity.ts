import { Psnuser } from '@server/psnuser/psnuser.entity';
import {Entity,Column,PrimaryGeneratedColumn, Index, OneToMany, Raw} from 'typeorm';

@Entity()
@Index('user_email_uindex', ['email'], {unique: true})
@Index('user_username_uindex', ['username'], {unique: true})
export class User{
    @PrimaryGeneratedColumn()
    id : number;
    // Create primary and auto increment

    @Column({type : 'varchar',length : 200})
    name : string

    @Column({type : 'varchar',length : 80})
    username : string

    @Column({type : 'varchar',length : 255})
    email : string;

    @Column({type : "json"})
    password: {
        salt : string;
        hash : string;
    }

    @OneToMany(() => Psnuser, psnUser => psnUser.user)
    psnUser: Psnuser[];  

    @Column({type : 'bool', default: true})
    isPrivate : boolean;

    @Column({type : 'timestamp',default : () => "CURRENT_TIMESTAMP"})
    createdAt : Date;

    @Column({type : 'timestamp',default : () => "CURRENT_TIMESTAMP"})
    updatedAt : Date;

}