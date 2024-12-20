import { ApiProperty } from "@nestjs/swagger"

export class AddRoleDto {
  @ApiProperty({ example: "ADMIN", description: "Role value" })
  readonly value: string

  @ApiProperty({ example: 1, description: "User identifier" })
  readonly userId: number
}