import { ForbiddenException, Injectable, NotFoundException } from "@nestjs/common"
import { UsersService } from "../users/users.service"
import { SetUserRoleDto } from "./dto/set-user-role.dto"
import { Roles } from "../users/users.model"

@Injectable()
export class RolesService {
  constructor(private usersService: UsersService) {
  }

  async getUserRole(userId: number) {
    const user = await this.usersService.getUserById(userId)

    if (!user) {
      throw new Error(`User with id ${ userId } not found`)
    }

    return {
      userId: user.id,
      value: user.role
    } as SetUserRoleDto
  }

  async setUserRole(dto: SetUserRoleDto) {
    const user = await this.usersService.getUserById(dto.userId)

    if (!user) {
      throw new NotFoundException(`User with id ${ dto.userId } not found`)
    }

    if (user.role === Roles.ADMIN) {
      throw new ForbiddenException("You can't change role of admin")
    }

    user.role = dto.value
    await user.save()

    return user
  }
}
