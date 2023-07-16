import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// import { TrpcModule } from '@server/trpc/trpc.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/user.entity';
import { UserController } from './user/user.controller';
import { UserModule } from './user/user.module';
import { UserService } from './user/user.service';

@Module({
  imports: [TypeOrmModule.forRoot({
    type : "mariadb",
    host : "127.0.0.1",
    port : 3306,
    username : "root",
    password : 'root',
    database : 'gameprofiles',
    entities: [User],
    synchronize : true,
    retryAttempts : 100,
    retryDelay : 2000,
    autoLoadEntities : false,
    logging : true,
  }),UserModule],
  controllers: [AppController,UserController],
  providers: [AppService,UserService],
})
export class AppModule {}
