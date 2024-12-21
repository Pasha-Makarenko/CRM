import { Body, Controller, Get, Param, Post } from "@nestjs/common"
import { OrdersService } from "./orders.service"
import { ApiOperation, ApiResponse } from "@nestjs/swagger"
import { CreateOrderDto } from "./dto/create-order.dto"

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

  @ApiOperation({ summary: "Get order by id" })
  @ApiResponse({ status: 200, type: CreateOrderDto })
  @Get("/:id")
  getById(@Param("id") id: number) {
    return this.ordersService.getOrdersById(id)
  }

  @ApiOperation({ summary: "Get all orders" })
  @ApiResponse({ status: 200, type: Array<CreateOrderDto> })
  @Get("/all")
  getAll() {
    return this.ordersService.getAllOrders()
  }

  @ApiOperation({ summary: "Get all user's orders" })
  @ApiResponse({ status: 200, type: Array<CreateOrderDto> })
  @Get("/all/:id")
  getAllByUserID(@Param("id") id: number) {
    return this.ordersService.getAllOrdersByUserId(id)
  }

  @ApiOperation({ summary: "Change order status" })
  @ApiResponse({ status: 200, type: CreateOrderDto })
  @Post("/changeStatus")
  changeStatus(@Body() dto: CreateOrderDto) {
    return this.ordersService.changeOrderStatus(dto.id, dto.status)
  }
}
