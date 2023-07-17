import { Module, forwardRef } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { UserModule } from '@server/user/user.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.strategy';
import { UserService } from '@server/user/user.service';
require("dotenv").config();
console.log("secret!!!!!!!!! :" , process.env.JWT_SECRET);

@Module({
  imports : [
    PassportModule.register({defaultStrategy:'jwt'}),
    JwtModule.register({
      secret :process.env.JWT_SECRET,
      signOptions:{expiresIn:'30m'}
    }),
    forwardRef(()=>UserModule)
  ],
  providers:[AuthService,LocalStrategy,JwtStrategy,UserService],
  exports:[AuthService,JwtModule],
  controllers: [AuthController]
})
export class AuthModule {}
