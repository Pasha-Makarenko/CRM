import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common"
import { Observable } from "rxjs"
import { Reflector } from "@nestjs/core"
import { ROLES_KEY } from "../role-auth.decorator"
import { Roles, User } from "../../users/users.model"

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {
  }

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    try {
      const requiredRoles = this.reflector.get<Array<Roles>>(ROLES_KEY, context.getHandler())

      if (!requiredRoles) {
        return true
      }

      const request = context.switchToHttp().getRequest()
      const user: User = request.user

      return requiredRoles.includes(user.role)
    } catch (error) {
      throw new ForbiddenException("Forbidden")
    }
  }
}