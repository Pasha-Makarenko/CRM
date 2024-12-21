import { ApiProperty } from "@nestjs/swagger"
import { Roles } from "../roles.model"

export class CreateRoleDto {
  @ApiProperty({ example: "ADMIN", description: "Role value" })
  readonly value: Roles
}