import { Body, Controller, Get, Param, Post, Put, UseGuards } from "@nestjs/common"
import { OrdersService } from "./orders.service"
import { ApiOperation, ApiResponse } from "@nestjs/swagger"
import { CreateOrderDto } from "../dto/create-order.dto"
import { UpdateOrderDto } from "../dto/update-order.dto"
import { Roles } from "../users/users.model"
import { RoleAuth } from "../decorators/role-auth.decorator"
import { JwtAuthGuard } from "../guards/jwt-auth.guard"
import { RolesGuard } from "../guards/roles.guard"
import { AddOrderDto } from "../dto/add-order.dto"
import { RemoveOrderDto } from "../dto/remove-order.dto"
import { Order } from "./orders.model"

@Controller("orders")
export class OrdersController {
  constructor(private ordersService: OrdersService) {
  }

  @ApiOperation({ summary: "Create order" })
  @ApiResponse({ status: 200, type: CreateOrderDto })
  @Post()
  create(@Body() dto: CreateOrderDto) {
    return this.ordersService.createOrder(dto)
  }

  @ApiOperation({ summary: "Change order status" })
  @ApiResponse({ status: 200, type: CreateOrderDto })
  @Put()
  update(@Body() dto: UpdateOrderDto) {
    return this.ordersService.updateOrder(dto)
  }

  @ApiOperation({ summary: "Get order by id" })
  @ApiResponse({ status: 200, type: CreateOrderDto })
  @Get("/:id")
  getById(@Param("id") id: number) {
    return this.ordersService.getOrdersById(id)
  }

  @ApiOperation({ summary: "Get all orders" })
  @ApiResponse({ status: 200, type: Array<CreateOrderDto> })
  @Get()
  getAll() {
    return this.ordersService.getAllOrders()
  }

  @ApiOperation({ summary: "Add order" })
  @ApiResponse({ status: 200, type: [ Order ] })
  @RoleAuth(Roles.ADMIN, Roles.MANAGER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post("/user")
  addUserOrder(@Body() dto: AddOrderDto) {
    return this.ordersService.addUserOrder(dto)
  }

  @ApiOperation({ summary: "Delete order" })
  @ApiResponse({ status: 200, type: [ Order ] })
  @RoleAuth(Roles.ADMIN, Roles.MANAGER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Put("/user")
  removeUserOrder(@Body() dto: RemoveOrderDto) {
    return this.ordersService.removeUserOrder(dto)
  }

  @ApiOperation({ summary: "Get all user's orders" })
  @ApiResponse({ status: 200, type: [ Order ] })
  @Get("/user/:userId")
  getUserOrders(@Param("userId") userId: number) {
    return this.ordersService.getUserOrders(userId)
  }
}
