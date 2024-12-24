import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common"
import { Observable } from "rxjs"
import { User } from "../../users/users.model"

@Injectable()
export class GetSubordinatesGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    try {
      const request = context.switchToHttp().getRequest()
      const user: User = request.user

      if (user.role === "ADMIN") {
        return true
      }

      if (user.role === "MANAGER") {
        const userId = request.params.userId
        return user.id === userId
      }

      return false
    } catch (error) {
      throw new ForbiddenException("Forbidden")
    }
  }
}