import { ApiProperty } from "@nestjs/swagger"
import { IsDate, IsEmail, IsEnum, IsNumber, IsOptional, IsString } from "class-validator"
import { OrderStatus } from "../orders/orders.model"

export class UpdateOrderDto {
  @ApiProperty({ example: 1, description: "Unique identifier" })
  @IsNumber({}, { message: "Must be a number" })
  readonly id: number

  @ApiProperty({ example: "CREATED", description: "Order status" })
  @IsOptional()
  @IsEnum(OrderStatus, { message: "Incorrect status" })
  readonly status: OrderStatus

  @ApiProperty({ example: "2021-10-01", description: "Due date" })
  @IsOptional()
  @IsDate({ message: "Incorrect date" })
  readonly dueDate: Date

  @ApiProperty({ example: "Some description", description: "Order description" })
  @IsOptional()
  @IsString({ message: "Must be a string" })
  readonly description: string

  @ApiProperty({ example: "example@gmail.com", description: "Contact person" })
  @IsOptional()
  @IsEmail({}, { message: "Incorrect email" })
  readonly contact: string

  @ApiProperty({ example: 1, description: "User identifier" })
  @IsOptional()
  @IsNumber({}, { message: "Must be a number" })
  readonly userId: number
}