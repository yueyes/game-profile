import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { encryptPassword } from '@server/utils/cryptogram';


@Injectable()
export class AuthService {
    constructor(private readonly usersService:UserService,private readonly jwtService: JwtService){}; 
    // JWT Auth-step 2：Identify user info
    async validateUser(username:string,password:string):Promise<any>{
        console.log('Jwt auth - Step 2： check user information');
        const user = await this.usersService.findOne({username});
        if(user){
            const salt= user.password.salt;
            const hashedPassword =user.password.hash;
            console.log(salt);
            console.log(hashedPassword);
            
            //Use salt hash and compare to database
            const hashPassword = encryptPassword(password,salt);
            console.log("user : ",hashPassword);
            console.log("db : ",hashedPassword);
            if(hashedPassword===hashPassword){
                console.log("Pass")
                return {
                    code:1,
                    user,
                    msg:'Password Correct'
                }
            }else{
                return {
                    code:2,
                    user:null,
                    msg:'Password Error'
                }
            }

            
        }
        // User Not Found
        return {
            code:3,
            user:null,
            msg:'User Not Found'
        }
    }

    // jwt auth-step 3：Handle jwt signature
    async certificate(user:any){
        const payload={
            username:user.username,
            email : user.email
        }
        console.log('JWT auth-step 3：Handle jwt signature');
        try {
            const token = this.jwtService.sign(payload);
            const {id,...rest} = user;
            return {
                code:200,
                data:{
                    token,
                    user : {
                        email : user.email,
                        username : user.username,
                        displayName : user.name,
                        isPrivate : user.isPrivate
                    }
                },
                msg:'Login Success'
            }
        } catch (error) {
            console.log(error)
            return{
                code:600,
                msg:'Account Or Password Error'
            }
        }
    }
}