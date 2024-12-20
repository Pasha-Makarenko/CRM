import { ApiProperty } from "@nestjs/swagger"

export class CreateRoleDto {
  @ApiProperty({ example: "ADMIN", description: "Role value" })
  readonly value: string
}