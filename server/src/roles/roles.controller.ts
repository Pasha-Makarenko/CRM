import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common"
import { RolesService } from "./roles.service"
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger"
import { RoleAuth } from "../decorators/role-auth.decorator"
import { RolesGuard } from "../guards/roles.guard"
import { SetUserRoleDto } from "../dto/set-user-role.dto"
import { Roles, User } from "../users/users.model"
import { JwtAuthGuard } from "../guards/jwt-auth.guard"
import { SetUserRoleGuard } from "../guards/set-user-role.guard"

@ApiTags("Roles")
@Controller("roles")
export class RolesController {
  constructor(private rolesService: RolesService) {
  }

  @ApiOperation({ summary: "Get user role" })
  @ApiResponse({ status: 200, type: SetUserRoleDto })
  @Get("/:userId")
  getRole(@Param("userId") userId: number) {
    return this.rolesService.getUserRole(userId)
  }

  @ApiOperation({ summary: "Set user role" })
  @ApiResponse({ status: 200, type: User })
  @RoleAuth(Roles.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard, SetUserRoleGuard)
  @Post()
  setRole(@Body() dto: SetUserRoleDto) {
    return this.rolesService.setUserRole(dto)
  }
}
