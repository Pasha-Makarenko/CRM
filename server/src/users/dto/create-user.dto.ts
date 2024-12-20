import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsString, Matches } from "class-validator"

export class CreateUserDto {
  @ApiProperty({ example: "example@gmail.com", description: "User email" })
  @IsString({ message: "Must be a string" })
  @IsEmail({}, { message: "Incorrect email" })
  readonly email: string

  @ApiProperty({ example: "12345678Aa", description: "User password" })
  @IsString({ message: "Must be a string" })
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, { message: "Password is too weak" })
  readonly password: string
}