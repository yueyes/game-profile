import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import { hash } from 'bcrypt';

interface IUser{
    username : string;
    email : string;
    password : string;
    name : string;
}
@Controller("user")
export class UserController {
    constructor(
        private readonly userService: UserService
    ){}

    @Get("/users")
    async getUsers(): Promise<Partial<User>[]> {
        try{
            const res =  await this.userService.findAll();
            return res;
          }catch(err){
            console.log(err);
            throw new Error(err);
          }
    }

    @Post("/register")
    async createUser(@Body() body: IUser): Promise<Partial<User>> {
        try{

            const {username,email,password,name} = body;
            console.log("body : ",body);
            const token  = await hash(password,10);
            console.log(token);
            const res =  await this.userService.createUser({username,email,userToken:token,name})
            const {id,...rest} = res;
            return rest;
          }catch(err){
            console.log(err);
            throw new Error(err);
          }
    }
}