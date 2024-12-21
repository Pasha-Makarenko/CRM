import { SequelizeModuleOptions } from "@nestjs/sequelize"
import { ConfigService } from "@nestjs/config"
import { User } from "../users/users.model"
import { Role } from "../roles/roles.model"
import { UserRoles } from "../roles/user-roles.model"
import { Order } from "../orders/orders.model"

export const getSequelizeConfig = (configService: ConfigService): SequelizeModuleOptions => ({
  dialect: "postgres",
  host: configService.get<string>("POSTGRES_HOST"),
  port: configService.get<number>("POSTGRES_PORT"),
  username: configService.get<string>("POSTGRES_USER"),
  password: configService.get<string>("POSTGRES_PASS"),
  database: configService.get<string>("POSTGRES_DB"),
  autoLoadModels: true,
  synchronize: process.env.NODE_ENV === "development",
  models: [ User, Role, UserRoles, Order ]
})