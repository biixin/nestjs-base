import { IsNotEmpty, IsEmail, MinLength } from "class-validator";


export class CreateUserDTO {

  @IsNotEmpty()
  @MinLength(4)
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(4)
  password: string;

  gender?: string;
  token?: string
}