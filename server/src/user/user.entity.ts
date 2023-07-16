import {Entity,Column,PrimaryGeneratedColumn, Index} from 'typeorm';

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

    @Column({type : "text"})
    token: string;

    @Column({type : 'timestamp',default : () => "CURRENT_TIMESTAMP"})
    createdAt : Date;

    @Column({type : 'timestamp',default : () => "CURRENT_TIMESTAMP"})
    updatedAt : Date;

}