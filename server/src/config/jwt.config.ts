import { ConfigService } from "@nestjs/config"
import { JwtModuleOptions } from "@nestjs/jwt"

export const getJwtConfig = (configService: ConfigService): JwtModuleOptions => ({
  secret: configService.get<string>("SECRET_KEY"),
  signOptions: {
    expiresIn: "24h"
  }
})