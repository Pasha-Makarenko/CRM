import { Body, Controller, Get, Post, UseGuards, UsePipes } from "@nestjs/common"
import { CreateUserDto } from "./dto/create-user.dto"
import { UsersService } from "./users.service"
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger"
import { User } from "./users.model"
import { RoleAuth } from "../auth/role-auth.decorator"
import { RolesGuard } from "../auth/roles.guard"
import { AddRoleDto } from "./dto/add-role.dto"
import { ValidationPipe } from "../pipes/validation.pipe"

@ApiTags("Users")
@Controller("users")
export class UsersController {
  constructor(private usersService: UsersService) {
  }

  @ApiOperation({ summary: "Create user" })
  @ApiResponse({ status: 200, type: User })
  @UsePipes(ValidationPipe)
  @Post()
  create(@Body() dto: CreateUserDto) {
    return this.usersService.createUser(dto)
  }

  @ApiOperation({ summary: "Get all users" })
  @ApiResponse({ status: 200, type: [ User ] })
  @Get()
  getAll() {
    return this.usersService.getAllUsers()
  }

  @ApiOperation({ summary: "Add role" })
  @ApiResponse({ status: 200 })
  @RoleAuth("ADMIN")
  @UseGuards(RolesGuard)
  @Post("/role")
  addRole(@Body() dto: AddRoleDto) {
    return this.usersService.addRole(dto)
  }
}
