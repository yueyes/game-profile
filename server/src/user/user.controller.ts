import { Body, Controller, Get, Param, Post, Res, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import { PsnuserService } from '@server/psnuser/psnuser.service';
import { encryptPassword, makeSalt } from '@server/utils/cryptogram';
import { AuthService } from '@server/auth/auth.service';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { Userme } from './user.decorator';
import { serialize } from 'cookie';

const JWT_SECRET = "TestSECRET"

interface IUser{
    username : string;
    email : string;
    password : string;
    rePassword : string;
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
    @Get("/me")
    async getCurrentUser(@Userme() user:any){
        console.log(user);
    }

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
    async login(@Body() loginParmas:any,@Res({passthrough:true}) response:Response){
      
        console.log('JWTAuth - Step 1: Login' , loginParmas);
        const authResult = await this.authService.validateUser(loginParmas.username,loginParmas.
password);
          console.log(authResult);
        switch(authResult.code){
            case 1:
                // response.cookie("user_token",authResult.token);
                const data = await this.authService.certificate(authResult.user)
                console.log(data);
                response.setHeader('Set-Cookie', serialize('user_token',data.data!.token, {
                  httpOnly: true,
                  sameSite: 'strict',
                  maxAge: 7 * 24 * 60 * 60 * 1000
                }))
                // response.set('Access-Control-Allow-Origin', '*')
                // response.set('Access-Control-Allow-Credentials', 'true')
                // response.set('Access-Control-Allow-Methods', 'GET, OPTIONS')
                // response.set('Access-Control-Allow-Headers', 'Content-Type')
                return response.json(data);
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
    async createUser(@Body() body: IUser,@Res({passthrough:true}) response:Response): Promise<any> {
        try{

            const {username,email,password,rePassword,name,psnUsername,psnDisplayName,isPrivate=true} = body;
            console.log("body : ",body);
            if(password !== rePassword){
              return{
                code : 400,
                message : "Password not correct!"
              }
            }
            const user = await this.userService.findOne({username});
            if(user){
              return {
                code:400,
                msg:'User existed!'
              }
            }
            const salt = makeSalt();
            const token  = await encryptPassword(password,salt);
            const res =  await this.userService.createUser({username,email,userToken:token,salt,name,isPrivate})
            const {id,...rest} = res;
            if(psnUsername){
              await this.psnuserService.createUser({userId: id,username:psnUsername,displayName:psnDisplayName})
            }
            // await this.psnuserService.createUser({userId: id,username:psnUsername,displayName:psnDisplayName})
            const authResult = await this.authService.validateUser(username,password);
            response.cookie("user_token",authResult.token);
            return {
              email : res.email,
              username : res.username,
              displayName : res.name,
              isPrivate : res.isPrivate
            };
          }catch(err){
            console.log(err);
            throw new Error(err);
          }
    }
}