import { ApiProperty } from "@nestjs/swagger"
import { IsEnum, IsNumber } from "class-validator"
import { OrderStatus } from "../orders.model"

export class ChangeStatusOrderDto {
  @ApiProperty({ example: 1, description: "Order identifier" })
  @IsNumber({}, { message: "Must be a number" })
  readonly orderId: number

  @ApiProperty({ example: "CREATED", description: "Order status" })
  @IsEnum(OrderStatus, { message: "Incorrect status" })
  readonly status: string
}