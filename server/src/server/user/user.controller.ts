import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put
  } from '@nestjs/common';
  import { CreateUserDTO, EditUserDTO } from './user.dto';
  import { User } from './user.interface';
  import { UserService } from './user.service';
  import {hash} from 'bcrypt';
  
  interface UserResponse<T = unknown> {
    code: number;
    data?: T;
    message: string;
  }
  
  @Controller('user')
  export class UserController {
    constructor(private readonly userService: UserService) {}
  
    // GET /user/users
    @Get('users')
    async findAll(): Promise<UserResponse<User[]>> {
      return {
        code: 200,
        data: await this.userService.findAll(),
        message: 'Success.'
      };
    }
  
    // GET /user/:_id
    @Get(':username')
    async findOne(@Param('username') username: string): Promise<UserResponse<User>> {
        const user = await this.userService.findOne(username);
        if(user){
            return {
                code: 200,
                data: user,
                message: 'Success.'
              };
        }else{
            return{
                code : 404,
                message : "User Not Found"
            }
        }
    }
  
    // POST /user
    @Post()
    async addOne(@Body() body: CreateUserDTO): Promise<UserResponse> {
      await this.userService.addOne(body);
      return {
        code: 200,
        message: 'Success.'
      };
    }
  
    // PUT /user/:_id
    @Put(':username')
    async editOne(
      @Param('username') username: string,
      @Body() body: EditUserDTO
    ): Promise<UserResponse> {
      await this.userService.editOne(username, body);
      return {
        code: 200,
        message: 'Success.'
      };
    }
  
    // DELETE /user/:_id
    @Delete(':username')
    async deleteOne(@Param('username') username: string): Promise<UserResponse> {
      await this.userService.deleteOne(username);
      return {
        code: 200,
        message: 'Success.'
      };
    }
  }