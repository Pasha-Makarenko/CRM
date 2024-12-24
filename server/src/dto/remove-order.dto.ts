import { ApiProperty } from "@nestjs/swagger"
import { IsNumber } from "class-validator"

export class RemoveOrderDto {
  @ApiProperty({ example: 1, description: "User identifier" })
  @IsNumber({}, { message: "Should be a number" })
  readonly userId: number

  @ApiProperty({ example: 1, description: "Order identifier" })
  @IsNumber({}, { message: "Should be a number" })
  readonly orderId: number
}