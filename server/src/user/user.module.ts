import { TypeOrmModule } from "@nestjs/typeorm";
import {Module, forwardRef} from '@nestjs/common';
import {UserService} from './user.service';
import { User } from './user.entity';
import { PsnuserModule } from "@server/psnuser/psnuser.module";
import { PsnuserService } from "@server/psnuser/psnuser.service";
import { AuthService } from "@server/auth/auth.service";
import { AuthModule } from "@server/auth/auth.module";
// import { Entity } from "typeorm";

@Module({
    imports : [TypeOrmModule.forFeature([User]),PsnuserModule,forwardRef(()=>AuthModule)],
    providers:[UserService,PsnuserService,AuthService],
    exports : [TypeOrmModule],
})

export class UserModule {}