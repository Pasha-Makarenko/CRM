import { Injectable, NotFoundException } from "@nestjs/common"
import { AssignManagerDto } from "../dto/assign-manager.dto"
import { UsersService } from "../users/users.service"
import { Roles } from "../users/users.model"

@Injectable()
export class SubordinationService {
  constructor(private userService: UsersService) {
  }

  async assignManager(dto: AssignManagerDto) {
    const user = await this.userService.getUserById(dto.userId)
    const manager = await this.userService.getUserById(dto.managerId)

    const isUser = user && user.role === Roles.USER
    const isManager = manager && manager.role === Roles.MANAGER

    if (isUser && isManager) {
      user.managerId = manager.id
      return await user.save()
    }

    throw new NotFoundException("User or manager not found")
  }

  async unassignManager(dto: AssignManagerDto) {
    const user = await this.userService.getUserById(dto.userId)
    const manager = await this.userService.getUserById(dto.managerId)

    const isUser = user && user.role === Roles.USER
    const isManager = manager && manager.role === Roles.MANAGER

    if (isUser && isManager) {
      user.managerId = null
      return await user.save()
    }

    throw new NotFoundException("User or manager not found")
  }

  async getManagerSubordinates(managerId: number) {
    return await this.userService.getAllUsers({ managerId })
  }
}
