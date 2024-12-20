import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common"
import { Observable } from "rxjs"
import { JwtService } from "@nestjs/jwt"
import { Reflector } from "@nestjs/core"
import { ROLES_KEY } from "./role-auth.decorator"
import { User } from "../users/users.model"

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private jwtService: JwtService,
              private reflector: Reflector) {
  }

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    try {
      const requiredRoles = this.reflector.get<string[]>(ROLES_KEY, context.getHandler())

      if (!requiredRoles) {
        return true
      }

      const request = context.switchToHttp().getRequest()

      const [ bearer, token ] = request.headers.authorization.split(" ")

      if (bearer !== "Bearer" || !token) {
        throw new UnauthorizedException("Unauthorized")
      }

      const user: User = this.jwtService.verify(token)
      request.user = user

      return user.roles.some(role => requiredRoles.includes(role.value))
    } catch (error) {
      throw new UnauthorizedException("Unauthorized")
    }
  }
}