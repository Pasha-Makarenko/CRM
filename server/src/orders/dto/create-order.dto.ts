import { ApiProperty } from "@nestjs/swagger"
import { OrderStatus } from "../orders.model"
import { IsDate, IsEmail, IsEnum, IsNumber, IsString } from "class-validator"

export class CreateOrderDto {
  @ApiProperty({ example: 1, description: "Unique identifier" })
  @IsNumber({}, { message: "Must be a number" })
  readonly id: number

  @ApiProperty({ example: "CREATED", description: "Order status" })
  @IsEnum(OrderStatus, { message: "Incorrect status" })
  readonly status: OrderStatus

  @ApiProperty({ example: "2021-10-01", description: "Due date" })
  @IsDate({ message: "Incorrect date" })
  readonly dueDate: Date

  @ApiProperty({ example: "Some description", description: "Order description" })
  @IsString({ message: "Must be a string" })
  readonly description: string

  @ApiProperty({ example: "example@gmail.com", description: "Contact person" })
  @IsEmail({}, { message: "Incorrect email" })
  readonly contact: string

  @ApiProperty({ example: 1, description: "User identifier" })
  @IsNumber({}, { message: "Must be a number" })
  readonly userId: number
}