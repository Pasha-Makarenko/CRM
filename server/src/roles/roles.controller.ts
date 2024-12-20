import { Body, Controller, Get, Param, Post } from "@nestjs/common"
import { RolesService } from "./roles.service"
import { CreateRoleDto } from "./dto/create-role.dto"
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger"

@ApiTags("Roles")
@Controller("roles")
export class RolesController {
  constructor(private rolesService: RolesService) {
  }

  @ApiOperation({ summary: "Create role" })
  @ApiResponse({ status: 200, type: CreateRoleDto })
  @Post()
  create(@Body() dto: CreateRoleDto) {
    return this.rolesService.createRole(dto)
  }

  @ApiOperation({ summary: "Get role by value" })
  @ApiResponse({ status: 200, type: CreateRoleDto })
  @Get("/:value")
  getByValue(@Param("value") value: string) {
    return this.rolesService.getRoleByValue(value)
  }
}
