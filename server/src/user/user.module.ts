import { TypeOrmModule } from "@nestjs/typeorm";
import {Module} from '@nestjs/common';
import {UserService} from './user.service';
import { User } from './user.entity';
// import { Entity } from "typeorm";

console.log(User);

@Module({
    imports : [TypeOrmModule.forFeature([User])],
    providers:[UserService],
    exports : [TypeOrmModule],
})

export class UserModule {}