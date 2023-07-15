import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// import { TrpcModule } from '@server/trpc/trpc.module';
import { UserModule } from './server/user/user.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forRoot('mongodb://127.0.0.1:27017/GameProfile'),UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
