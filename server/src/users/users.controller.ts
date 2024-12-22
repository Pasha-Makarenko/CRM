import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from "@nestjs/common"
import { CreateUserDto } from "./dto/create-user.dto"
import { UsersService } from "./users.service"
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger"
import { User } from "./users.model"
import { RoleAuth } from "../auth/role-auth.decorator"
import { RolesGuard } from "../auth/roles.guard"
import { AddRoleDto } from "./dto/add-role.dto"
import { AddOrderDto } from "./dto/add-order.dto"
import { Role, Roles } from "../roles/roles.model"
import { RemoveOrderDto } from "./dto/remove-order.dto"

@ApiTags("Users")
@Controller("users")
export class UsersController {
  constructor(private usersService: UsersService) {
  }

  @ApiOperation({ summary: "Create user" })
  @ApiResponse({ status: 200, type: User })
  @RoleAuth(Roles.ADMIN)
  @UseGuards(RolesGuard)
  @Post()
  create(@Body() dto: CreateUserDto) {
    return this.usersService.createUser(dto)
  }

  @ApiOperation({ summary: "Get all users" })
  @ApiResponse({ status: 200, type: [ User ] })
  @RoleAuth(Roles.ADMIN)
  @UseGuards(RolesGuard)
  @Get()
  getAll() {
    return this.usersService.getAllUsers()
  }

  @ApiOperation({ summary: "Add role" })
  @ApiResponse({ status: 200, type: AddRoleDto })
  @RoleAuth(Roles.ADMIN)
  @UseGuards(RolesGuard)
  @Post("/role")
  addRole(@Body() dto: AddRoleDto) {
    return this.usersService.addRole(dto)
  }

  @ApiOperation({ summary: "Get user's roles" })
  @ApiResponse({ status: 200, type: [ Role ] })
  @Get("/:userId/role")
  getRoles(@Param() userId: number) {
    return this.usersService.getUserRoles(userId)
  }

  @ApiOperation({ summary: "Add order" })
  @ApiResponse({ status: 200, type: User })
  @RoleAuth(Roles.ADMIN, Roles.MANAGER)
  @UseGuards(RolesGuard)
  @Post("/order")
  addOrder(@Body() dto: AddOrderDto) {
    return this.usersService.addOrder(dto)
  }

  @ApiOperation({ summary: "Delete order" })
  @ApiResponse({ status: 200, type: User })
  @RoleAuth(Roles.ADMIN, Roles.MANAGER)
  @UseGuards(RolesGuard)
  @Put("/order")
  removeOrder(@Body() dto: RemoveOrderDto) {
    return this.usersService.removeOrder(dto)
  }
}
