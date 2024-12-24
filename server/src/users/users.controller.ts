import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common"
import { CreateUserDto } from "./dto/create-user.dto"
import { UsersService } from "./users.service"
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger"
import { Roles, User } from "./users.model"
import { RoleAuth } from "../roles/decorators/role-auth.decorator"
import { RolesGuard } from "../roles/guards/roles.guard"
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard"

@ApiTags("Users")
@Controller("users")
export class UsersController {
  constructor(private usersService: UsersService) {
  }

  @ApiOperation({ summary: "Create user" })
  @ApiResponse({ status: 200, type: User })
  @RoleAuth(Roles.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  create(@Body() dto: CreateUserDto) {
    return this.usersService.createUser(dto)
  }

  @ApiOperation({ summary: "Get all users" })
  @ApiResponse({ status: 200, type: [ User ] })
  @RoleAuth(Roles.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get()
  getAll() {
    return this.usersService.getAllUsers()
  }
}
