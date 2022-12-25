import { Transform } from "class-transformer";
import { IsNotEmpty, IsEmail, IsString, IsBoolean, IsOptional, isDefined, IsDefined  } from "class-validator";
import { toBoolean } from "../../../common/helpers/cast.helper";


export class UpdateUserDTO {
  @IsString()
  @IsOptional()
  name?: string;
  
  @IsString()
  @IsEmail()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  password?: string;

  @IsString()
  @IsOptional()
  gender?: string;

  @IsString()
  @IsOptional()
  avatar?: string | null;


  // @Transform(({ value }) => {  
  //   return [true, 'enabled', 'true', 1, '1'].indexOf(value) > -1;  
  // }) 
  @Transform(({ value }) => toBoolean(value))
  @IsBoolean()
  @IsOptional()
  isAdmin?: boolean
}