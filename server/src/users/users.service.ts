import { Injectable, NotFoundException } from "@nestjs/common"
import { User } from "./users.model"
import { CreateUserDto } from "./dto/create-user.dto"
import { InjectModel } from "@nestjs/sequelize"
import { RolesService } from "../roles/roles.service"
import { AddRoleDto } from "./dto/add-role.dto"
import { OrdersService } from "../orders/orders.service"
import { AddOrderDto } from "./dto/add-order.dto"

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private userRepository: typeof User,
              private rolesService: RolesService,
              private ordersService: OrdersService) {
  }

  async createUser(dto: CreateUserDto) {
    const user = await this.userRepository.create(dto)
    const role = await this.rolesService.getRoleByValue("USER")

    await user.$set("roles", [ role.id ])
    user.roles = [ role ]

    return user
  }

  async getAllUsers() {
    return await this.userRepository.findAll({ include: { all: true } })
  }

  async getUserByEmail(email: string) {
    return await this.userRepository.findOne({
      where: { email },
      include: { all: true }
    })
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

  async addOrder(dto: AddOrderDto) {
    const user = await this.userRepository.findByPk(dto.userId)
    const order = await this.ordersService.getOrdersById(dto.orderId)

    if (user && order) {
      await user.$add("order", order.id)
      return user
    }

    throw new NotFoundException("User or order not found")
  }

  async removeOrder(dto: AddOrderDto) {
    const user = await this.userRepository.findByPk(dto.userId)
    const order = await this.ordersService.getOrdersById(dto.orderId)

    if (user && order) {
      await user.$remove("order", order.id)
      return user
    }

    throw new NotFoundException("User or order not found")
  }
}
