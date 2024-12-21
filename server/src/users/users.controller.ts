import { Body, Controller, Delete, Get, Post, UseGuards, UsePipes } from "@nestjs/common"
import { CreateUserDto } from "./dto/create-user.dto"
import { UsersService } from "./users.service"
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger"
import { User } from "./users.model"
import { RoleAuth } from "../auth/role-auth.decorator"
import { RolesGuard } from "../auth/roles.guard"
import { AddRoleDto } from "./dto/add-role.dto"
import { ValidationPipe } from "../pipes/validation.pipe"
import { AddOrderDto } from "./dto/add-order.dto"

@ApiTags("Users")
@Controller("users")
export class UsersController {
  constructor(private usersService: UsersService) {
  }

  @ApiOperation({ summary: "Create user" })
  @ApiResponse({ status: 200, type: User })
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

  @ApiOperation({ summary: "Add order" })
  @ApiResponse({ status: 200, type: User })
  @RoleAuth("ADMIN", "MANAGER")
  @UseGuards(RolesGuard)
  @Post("/order")
  addOrder(@Body() dto: AddOrderDto) {
    return this.usersService.addOrder(dto)
  }

  @ApiOperation({ summary: "Delete order" })
  @ApiResponse({ status: 200, type: User })
  @RoleAuth("ADMIN", "MANAGER")
  @UseGuards(RolesGuard)
  @Delete("/order")
  removeOrder(@Body() dto: AddOrderDto) {
    return this.usersService.removeOrder(dto)
  }
}
