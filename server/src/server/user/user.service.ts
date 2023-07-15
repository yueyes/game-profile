// user.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDTO, EditUserDTO } from './user.dto';
import { User } from './user.interface';
import { hash } from 'bcrypt';

@Injectable()
export class UserService {
  constructor(@InjectModel('Users') private readonly userModel: Model<User>) {}

  async findAll(): Promise<User[]> {
    const users = await this.userModel.find();
    return users;
  }

  async findOne(username: string): Promise<User|null> {
    return await this.userModel.findOne({username});
  }

  async addOne(body: CreateUserDTO): Promise<void> {
    const {username,password,email,displayName,icon} = body;
    const token = await hash(password,10);
    const user = {
      username,
      token,
      email,
      displayName,
      icon
    }
    await this.userModel.create(user);
  }

  async editOne(username:string,body: EditUserDTO): Promise<void> {
    const {displayName,icon} = body;
    const user = {
      displayName,
      icon
    }
    await this.userModel.findOneAndUpdate({username}, user);
  }
  
  async deleteOne(username: string): Promise<void> {
    await this.userModel.findOneAndDelete({username});
  }
}