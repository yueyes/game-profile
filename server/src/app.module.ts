import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/user.entity';
import { UserController } from './user/user.controller';
import { UserModule } from './user/user.module';
import { UserService } from './user/user.service';
import { PsnuserService } from './psnuser/psnuser.service';
import { PsnuserModule } from './psnuser/psnuser.module';
import { Psnuser } from './psnuser/psnuser.entity';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
@Module({
  imports: [TypeOrmModule.forRoot({
    type : "mariadb",
    host : "127.0.0.1",
    port : 13306,
    username : "root",
    password : 'root',
    database : 'gameProfiles',
    entities: [User,Psnuser],
    synchronize : true,
    retryAttempts : 100,
    retryDelay : 2000,
    autoLoadEntities : false,
    logging : true,
  }),UserModule,PsnuserModule, AuthModule],
  controllers: [AppController,UserController],
  providers: [AppService,UserService,PsnuserService, AuthService],
})
export class AppModule {}
