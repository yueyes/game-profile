import { ExecutionContext, createParamDecorator } from "@nestjs/common";

export const Userme = createParamDecorator((data:any,ctx:ExecutionContext)=>{
    const request = ctx.switchToHttp().getRequest();
    return request.user;
})