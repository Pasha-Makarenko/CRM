import { SequelizeModuleOptions } from "@nestjs/sequelize"
import { ConfigService } from "@nestjs/config"

export const getSequelizeConfig = (configService: ConfigService): SequelizeModuleOptions => ({
  dialect: "postgres",
  host: configService.get<string>("DB_HOST"),
  port: configService.get<number>("DB_PORT"),
  username: configService.get<string>("DB_USER"),
  password: configService.get<string>("DB_PASS"),
  database: configService.get<string>("DB_NAME"),
  autoLoadModels: true,
  synchronize: true // For development only
})