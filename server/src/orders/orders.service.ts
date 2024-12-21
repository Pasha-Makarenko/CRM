import { Injectable } from "@nestjs/common"
import { CreateOrderDto } from "./dto/create-order.dto"
import { InjectModel } from "@nestjs/sequelize"
import { Order, OrderStatus } from "./orders.model"

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

  async getAllOrdersByUserId(userId: number) {
    return await this.orderRepository.findAll({ where: { userId } })
  }

  async getAllOrders() {
    return await this.orderRepository.findAll()
  }

  async changeOrderStatus(id: number, status: OrderStatus) {
    const order = await this.orderRepository.findByPk(id)
    order.status = status
    return await order.save()
  }
}
