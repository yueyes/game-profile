import {ExtractJwt,Strategy} from 'passport-jwt';
import {PassportStrategy} from '@nestjs/passport'
import { Injectable } from "@nestjs/common";
import { AuthService } from './auth.service';
require("dotenv").config();

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(private authService: AuthService){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET,
          });
    }
    // JWT验证-step 4：被守卫调用
    async validate(payload:any){
        console.log(`JWT Auth-step 4：Used by Gard :`,payload);
        return {
            username : payload.username,
            email : payload.email
        }
    }
}