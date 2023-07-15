export class CreateUserDTO {
    readonly username: string;
    readonly password: string;
    readonly email: string;
    readonly displayName: string;
    readonly icon?:string;
  }
  
  export class EditUserDTO {
    readonly username: string;
    readonly password: string;
    readonly email: string;
    readonly displayName: string;
    readonly icon?:string;
  }