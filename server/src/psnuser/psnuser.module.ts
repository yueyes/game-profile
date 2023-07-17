import { TypeOrmModule } from "@nestjs/typeorm";
import {Module} from '@nestjs/common';
import {PsnuserService} from './psnuser.service';
import { Psnuser } from './psnuser.entity';
// import { Entity } from "typeorm";

@Module({
    imports : [TypeOrmModule.forFeature([Psnuser])],
    providers:[PsnuserService],
    exports : [TypeOrmModule],
})

export class PsnuserModule {}