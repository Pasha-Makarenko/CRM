import { Body, Controller, Get, Param, Post, Put, UseGuards } from "@nestjs/common"
import { CreateUserDto } from "./dto/create-user.dto"
import { UsersService } from "./users.service"
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger"
import { Roles, User } from "./users.model"
import { RoleAuth } from "../roles/role-auth.decorator"
import { RolesGuard } from "../roles/guards/roles.guard"
import { AddOrderDto } from "./dto/add-order.dto"
import { RemoveOrderDto } from "./dto/remove-order.dto"
import { Order } from "../orders/orders.model"
import { AssignManagerDto } from "./dto/assign-manager.dto"
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

  @ApiOperation({ summary: "Assign manager" })
  @ApiResponse({ status: 200, type: User })
  @RoleAuth(Roles.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Put("/manager")
  assignManager(@Body() dto: AssignManagerDto) {
    return this.usersService.assignManager(dto)
  }

  @ApiOperation({ summary: "Get manager subordinates" })
  @ApiResponse({ status: 200, type: [ User ] })
  @Get("/:userId/subordinates")
  getSubordinates(@Param("userId") userId: number) {
    return this.usersService.getManagerSubordinates(userId)
  }

  @ApiOperation({ summary: "Add order" })
  @ApiResponse({ status: 200, type: User })
  @RoleAuth(Roles.ADMIN, Roles.MANAGER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post("/order")
  addOrder(@Body() dto: AddOrderDto) {
    return this.usersService.addOrder(dto)
  }

  @ApiOperation({ summary: "Delete order" })
  @ApiResponse({ status: 200, type: User })
  @RoleAuth(Roles.ADMIN, Roles.MANAGER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Put("/order")
  removeOrder(@Body() dto: RemoveOrderDto) {
    return this.usersService.removeOrder(dto)
  }

  @ApiOperation({ summary: "Get all user's orders" })
  @ApiResponse({ status: 200, type: [ Order ] })
  @Get("/:userId/order")
  getOrders(@Param("userId") userId: number) {
    return this.usersService.getUserOrders(userId)
  }
}
