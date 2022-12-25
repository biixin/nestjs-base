import { IsNotEmpty, IsEmail,  } from "class-validator";


export class AuthUserDTO {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;

}