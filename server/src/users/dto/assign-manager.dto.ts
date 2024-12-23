import { ApiProperty } from "@nestjs/swagger"
import { IsNumber } from "class-validator"

export class AssignManagerDto {
  @ApiProperty({ example: 1, description: "User identifier" })
  @IsNumber({}, { message: "Should be a number" })
  readonly userId: number

  @ApiProperty({ example: 2, description: "Manager identifier" })
  @IsNumber({}, { message: "Should be a number" })
  readonly managerId: number
}