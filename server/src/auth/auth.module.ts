import { Module } from "@nestjs/common"
import { JwtModule } from "@nestjs/jwt"
import { AuthController } from "./auth.controller"
import { AuthService } from "./auth.service"
import { UsersService } from "../users/users.service"

@Module({
  controllers: [ AuthController ],
  providers: [ AuthService ],
  imports: [
    UsersService,
    JwtModule.register({
      secret: process.env.PRIMARY_KEY,
      signOptions: {
        expiresIn: "24h"
      }
    })
  ]
})
export class AuthModule {
}
