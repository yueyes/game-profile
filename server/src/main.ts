import "reflect-metadata";
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import { TrpcRouter } from './trpc/trpc.router';
import * as cookieParser from 'cookie-parser';
import cors from 'cors'; 

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  // app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
  app.use(cookieParser());
  // const trpc = app.get(TrpcRouter);
  // trpc.applyMiddleware(app);
  await app.listen(4000);
}
bootstrap();
