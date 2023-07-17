import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()

export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ){}

findOne({username}:{username:string}) : Promise<User|null>{
    return this.userRepository.findOne({where:{
        username
    }})
}

findAll(): Promise<User[]> {
    return this.userRepository.find()
}

createUser(userData : {username:string,email : string,userToken : string,salt : string,name : string,isPrivate:boolean}) : Promise<User>{
    const newUser = new User();
    newUser.username = userData.username;
    newUser.email = userData.email;
    newUser.password = {
        hash : userData.userToken,
        salt : userData.salt
    };
    newUser.name = userData.username;
    newUser.isPrivate = userData.isPrivate;
    return this.userRepository.save(newUser);
}

async remove(id: string): Promise<void> {
    await this.userRepository.delete(id)
}
}