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

findAll(): Promise<User[]> {
    return this.userRepository.find()
}

createUser(userData : {username:string,email : string,userToken : string,name : string}) : Promise<User>{
    const newUser = new User();
    newUser.username = userData.username;
    newUser.email = userData.email;
    newUser.token = userData.userToken;
    newUser.name = userData.username;
    return this.userRepository.save(newUser);
}

async remove(id: string): Promise<void> {
    await this.userRepository.delete(id)
}
}