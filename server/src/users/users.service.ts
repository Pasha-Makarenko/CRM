import { Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common"
import { Roles, User } from "./users.model"
import { CreateUserDto } from "./dto/create-user.dto"
import { InjectModel } from "@nestjs/sequelize"
import { OrdersService } from "../orders/orders.service"
import { AddOrderDto } from "./dto/add-order.dto"
import { RemoveOrderDto } from "./dto/remove-order.dto"
import { Order } from "../orders/orders.model"
import { AssignManagerDto } from "./dto/assign-manager.dto"

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

  async getAllUsers() {
    return await this.userRepository.findAll()
  }

  async getUserById(id: number) {
    return await this.userRepository.findByPk(id)
  }

  async getUserByEmail(email: string) {
    return await this.userRepository.findOne({ where: { email } })
  }

  async assignManager(dto: AssignManagerDto) {
    const user = await this.userRepository.findByPk(dto.userId)
    const manager = await this.userRepository.findByPk(dto.managerId)

    const isUser = user && user.role === Roles.USER
    const isManager = manager && manager.role === Roles.MANAGER

    if (isUser && isManager) {
      user.managerId = manager.id
      return await user.save()
    }

    throw new NotFoundException("User or manager not found")
  }

  async getManagerSubordinates(managerId: number) {


    return await this.userRepository.findAll({ where: { managerId } })
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
