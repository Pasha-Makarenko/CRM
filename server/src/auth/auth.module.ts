import { forwardRef, Module } from "@nestjs/common"
import { JwtModule } from "@nestjs/jwt"
import { AuthController } from "./auth.controller"
import { AuthService } from "./auth.service"
import { UsersModule } from "../users/users.module"
import { RolesModule } from "../roles/roles.module"
import { ConfigModule, ConfigService } from "@nestjs/config"
import { getJwtConfig } from "../config/jwt.config"

@Module({
  controllers: [ AuthController ],
  providers: [ AuthService ],
  imports: [
    forwardRef(() => UsersModule),
    forwardRef(() => RolesModule),
    JwtModule.registerAsync({
      imports: [ ConfigModule ],
      useFactory: getJwtConfig,
      inject: [ ConfigService ]
    })
  ],
  exports: [
    AuthService,
    JwtModule
  ]
})
export class AuthModule {
}
