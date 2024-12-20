import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common"
import { Observable } from "rxjs"
import { JwtService } from "@nestjs/jwt"

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {
  }

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest()

    try {
      const [ bearer, token ] = request.headers.authorization.split(" ")

      if (bearer !== "Bearer" || !token) {
        throw new UnauthorizedException("Unauthorized")
      }

      request.user = this.jwtService.verify(token)

      return true
    } catch (error) {
      throw new UnauthorizedException("Unauthorized")
    }
  }
}