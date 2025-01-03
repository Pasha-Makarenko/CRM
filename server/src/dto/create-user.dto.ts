import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsOptional, IsString, Matches } from "class-validator"

export class CreateUserDto {
  @ApiProperty({ example: "Name", description: "User name" })
  @IsOptional()
  @IsString({ message: "Must be a string" })
  readonly name: string

  @ApiProperty({ example: "example@gmail.com", description: "User email" })
  @IsString({ message: "Must be a string" })
  @IsEmail({}, { message: "Incorrect email" })
  readonly email: string

  @ApiProperty({ example: "12345678Aa", description: "User password" })
  @IsString({ message: "Must be a string" })
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,20}$/, { message: "Password is too weak" })
  readonly password: string
}