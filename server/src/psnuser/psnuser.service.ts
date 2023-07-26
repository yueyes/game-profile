import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Entity, Repository } from 'typeorm';
import { Psnuser } from './psnuser.entity';

@Injectable()
export class PsnuserService {
    constructor(
        @InjectRepository(Psnuser)
        private userRepository: Repository<Psnuser>,
    ){}

findAll(): Promise<Psnuser[]> {
    return this.userRepository.find()
}

createUser(userData : {username:string,userId:number,displayName?:string}) : Promise<Psnuser>{
    const newPsnuser = new Psnuser();
    newPsnuser.username = userData.username;
    newPsnuser.userId = userData.userId;
    if(userData.displayName){
        newPsnuser.displayName = userData.displayName;
    }
    return this.userRepository.save(newPsnuser);
}

async remove(id: string): Promise<void> {
    await this.userRepository.delete(id)
}
}