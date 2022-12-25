import { IsNotEmpty, IsEmail, IsString, IsIn, IsOptional,  } from "class-validator";

enum privacity {
  "public",
  "friends"
}

export class CreatePostDTO {
  @IsString()
  body?: string

  @IsIn([privacity])
  @IsOptional()
  @IsString()
  privacity?: string
}