import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import { PsnuserService } from '@server/psnuser/psnuser.service';
import { encryptPassword, makeSalt } from '@server/utils/cryptogram';
import { AuthService } from '@server/auth/auth.service';
import { AuthGuard } from '@nestjs/passport';

const JWT_SECRET = "TestSECRET"

interface IUser{
    username : string;
    email : string;
    password : string;
    repassword : string;
    name : string;
    isPrivate : boolean;
    psnUsername:string;
    psnDisplayName? : string;
}
@Controller("user")
export class UserController {
    constructor(
        private readonly userService: UserService,
        private readonly psnuserService : PsnuserService,
        private readonly authService : AuthService
    ){}

    @UseGuards(AuthGuard('jwt'))
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

    @UseGuards(AuthGuard('jwt'))
    @Get("/:username")
    async getUser(@Param('username') username:string) : Promise<User>{
      try{
        const res = await this.userService.findOne({username});
        if(!res){
          throw new Error("User Not Found.")
        }
        return res;

      }catch(err){
        console.log(err);
        throw new Error(err);
      }
    }

    // JWT Auth - Step 1: Login
    @Post('/login')
    async login(@Body() loginParmas:any){
        console.log('JWTAuth - Step 1: Login' , loginParmas);
        const authResult = await this.authService.validateUser(loginParmas.username,loginParmas.
password);
          console.log(authResult);
        switch(authResult.code){
            case 1:
                return this.authService.certificate(authResult.user);
            case 2:
                return {
                    code:600,
                    msg:'username or password not correct.'
                }
            default:
                return{
                    code:600,
                    msg:'User not found.'
                }
        }
    }

    @Post("/register")
    async createUser(@Body() body: IUser): Promise<any> {
        try{

            const {username,email,password,repassword,name,psnUsername,psnDisplayName,isPrivate=true} = body;
            console.log("body : ",body);
            if(password !== repassword){
              return{
                code : 400,
                message : "Password not correct!"
              }
            }
            const user =await this.userService.findOne({username});
            if(user){
              return {
                code:400,
                msg:'User existed!'
              }
            }
            const salt = makeSalt();
            const token  = await encryptPassword(password,salt);
            console.log(token);
            const res =  await this.userService.createUser({username,email,userToken:token,salt,name,isPrivate})
            const {id,...rest} = res;
            await this.psnuserService.createUser({userId: id,username:psnUsername,displayName:psnDisplayName})
            return rest;
          }catch(err){
            console.log(err);
            throw new Error(err);
          }
    }
}