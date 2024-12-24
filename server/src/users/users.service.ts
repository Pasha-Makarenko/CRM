import { Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common"
import { Roles, User } from "./users.model"
import { CreateUserDto } from "./dto/create-user.dto"
import { InjectModel } from "@nestjs/sequelize"
import { OrdersService } from "../orders/orders.service"
import { AddOrderDto } from "./dto/add-order.dto"
import { RemoveOrderDto } from "./dto/remove-order.dto"
import { Order } from "../orders/orders.model"
import { AssignManagerDto } from "./dto/assign-manager.dto"
import { FindOptions } from "sequelize"

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private userRepository: typeof User,
              private ordersService: OrdersService) {
  }

  async createUser(dto: CreateUserDto) {
    const user = await this.userRepository.create(dto)

    if (!user) {
      throw new InternalServerErrorException("User not created")
    }

    return user
  }

  async getAllUsers(condition: FindOptions<User>["where"] = {}) {
    return await this.userRepository.findAll({ where: condition })
  }

  async getUserById(id: number) {
    return await this.userRepository.findByPk(id)
  }

  async getUserByEmail(email: string) {
    return await this.userRepository.findOne({ where: { email } })
  }

  async addOrder(dto: AddOrderDto) {
    const user = await this.userRepository.findByPk(dto.userId)
    const order = await this.ordersService.getOrdersById(dto.orderId)

    if (user && order) {
      await user.$add("order", order.id)
      return user
    }

    throw new NotFoundException("User or order not found")
  }

  async removeOrder(dto: RemoveOrderDto) {
    const user = await this.userRepository.findByPk(dto.userId, {
      include: [ { model: Order } ]
    })
    const order = await this.ordersService.getOrdersById(dto.orderId)

    if (user && order) {
      await order.$remove("user", user.id)
      user.orders = user.orders.filter(o => o.id !== order.id)
      return await user.save()
    }

    throw new NotFoundException("User or order not found")
  }

  async getUserOrders(userId: number) {
    const user = await this.userRepository.findByPk(userId, { include: [ { model: Order } ] })
    return user.orders
  }
}
