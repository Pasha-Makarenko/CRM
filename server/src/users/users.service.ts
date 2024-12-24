import { Injectable, InternalServerErrorException } from "@nestjs/common"
import { User } from "./users.model"
import { CreateUserDto } from "../dto/create-user.dto"
import { InjectModel } from "@nestjs/sequelize"
import { FindOptions } from "sequelize"

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private userRepository: typeof User) {
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
}
