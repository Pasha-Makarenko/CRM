import { Injectable, NotFoundException } from "@nestjs/common"
import { User } from "./users.model"
import { CreateUserDto } from "./dto/create-user.dto"
import { InjectModel } from "@nestjs/sequelize"
import { RolesService } from "../roles/roles.service"
import { AddRoleDto } from "./dto/add-role.dto"
import { OrdersService } from "../orders/orders.service"
import { AddOrderDto } from "./dto/add-order.dto"
import { RemoveOrderDto } from "./dto/remove-order.dto"
import { Order } from "../orders/orders.model"
import { Role, Roles } from "../roles/roles.model"

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private userRepository: typeof User,
              private rolesService: RolesService,
              private ordersService: OrdersService) {
  }

  async createUser(dto: CreateUserDto) {
    const user = await this.userRepository.create(dto)
    const role = await this.rolesService.getRoleByValue(Roles.USER)

    await user.$set("roles", [ role.id ])
    user.roles = [ role ]

    return user
  }

  async getAllUsers() {
    return await this.userRepository.findAll()
  }

  async getUserByEmail(email: string) {
    return await this.userRepository.findOne({ where: { email } })
  }

  async addRole(dto: AddRoleDto) {
    const user = await this.userRepository.findByPk(dto.userId)
    const role = await this.rolesService.getRoleByValue(dto.value)

    if (user && role) {
      await user.$add("role", role.id)
      return dto
    }

    throw new NotFoundException("User or role not found")
  }

  async getUserRoles(userId: number) {
    const user = await this.userRepository.findByPk(userId, { include: [ { model: Role } ] })
    return user.roles
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
