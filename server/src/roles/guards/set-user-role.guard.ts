import { CanActivate, ExecutionContext, ForbiddenException, Inject, Injectable } from "@nestjs/common"
import { Observable } from "rxjs"
import { SetUserRoleDto } from "../dto/set-user-role.dto"
import { UsersService } from "../../users/users.service"
import { Roles } from "../../users/users.model"

@Injectable()
export class SetUserRoleGuard implements CanActivate {
  constructor(@Inject(UsersService) private userService: UsersService) {
  }

  // @ts-ignore
  async canActivate(context: ExecutionContext): Promise<boolean | Promise<boolean> | Observable<boolean>> {
    try {
      const request = context.switchToHttp().getRequest()
      const dto: SetUserRoleDto = request.body

      const user = await this.userService.getUserById(dto.userId)

      if (!user || user.role === Roles.ADMIN) {
        return false
      }

      return true
    } catch (error) {
      throw new ForbiddenException("Forbidden")
    }
  }
}