import { Injectable, NotFoundException } from "@nestjs/common"
import { CreateOrderDto } from "../dto/create-order.dto"
import { InjectModel } from "@nestjs/sequelize"
import { Order } from "./orders.model"
import { UpdateOrderDto } from "../dto/update-order.dto"
import { AddOrderDto } from "../dto/add-order.dto"
import { RemoveOrderDto } from "../dto/remove-order.dto"
import { UsersService } from "../users/users.service"

@Injectable()
export class OrdersService {
  constructor(@InjectModel(Order) private orderRepository: typeof Order,
              private usersService: UsersService) {
  }

  async createOrder(dto: CreateOrderDto) {
    return await this.orderRepository.create(dto)
  }

  async getOrdersById(id: number) {
    return await this.orderRepository.findOne({ where: { id } })
  }

  async getAllOrders() {
    return await this.orderRepository.findAll()
  }

  async updateOrder(dto: UpdateOrderDto) {
    const order = await this.orderRepository.findByPk(dto.id)

    if (order) {
      for (const key in dto) {
        if (key !== "id" && dto[key] && dto[key] !== order[key]) {
          await order.$set(key as keyof Order, dto[key])
        }
      }

      return order
    }

    throw new NotFoundException("Order not found")
  }

  async addUserOrder(dto: AddOrderDto) {
    const user = await this.usersService.getUserById(dto.userId)
    const order = await this.getOrdersById(dto.orderId)

    if (user && order) {
      await user.$add("orders", order.id)
      return await this.getUserOrders(dto.userId)
    }

    throw new NotFoundException("User or order not found")
  }

  async removeUserOrder(dto: RemoveOrderDto) {
    const user = await this.usersService.getUserById(dto.userId)
    const orders = await this.getUserOrders(dto.userId)
    const order = await this.getOrdersById(dto.orderId)

    if (user && order) {
      await order.$remove("user", user.id)
      user.orders = orders.filter(o => o.id !== order.id)
      await user.save()

      return user.orders
    }

    throw new NotFoundException("User or order not found")
  }

  async getUserOrders(userId: number) {
    return await this.orderRepository.findAll({ where: { userId } })
  }
}
