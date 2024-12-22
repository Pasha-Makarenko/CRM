import { Injectable, NotFoundException } from "@nestjs/common"
import { CreateOrderDto } from "./dto/create-order.dto"
import { InjectModel } from "@nestjs/sequelize"
import { Order, OrderStatus } from "./orders.model"
import { UpdateOrderDto } from "./dto/update-order.dto"

@Injectable()
export class OrdersService {
  constructor(@InjectModel(Order) private orderRepository: typeof Order) {
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
}
