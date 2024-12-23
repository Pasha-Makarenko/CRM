import { Module } from "@nestjs/common"
import { ConfigModule, ConfigService } from "@nestjs/config"
import { SequelizeModule } from "@nestjs/sequelize"
import { getSequelizeConfig } from "./config/database.config"
import { UsersModule } from "./users/users.module"
import { RolesModule } from "./roles/roles.module"
import { AuthModule } from "./auth/auth.module"
import { OrdersModule } from "./orders/orders.module"
import { config } from "./config/config"
import { SubordinationModule } from "./subordination/subordination.module"

@Module({
  imports: [
    ConfigModule.forRoot(config),
    SequelizeModule.forRootAsync({
      imports: [ ConfigModule ],
      useFactory: getSequelizeConfig,
      inject: [ ConfigService ]
    }),
    UsersModule,
    RolesModule,
    AuthModule,
    OrdersModule,
    SubordinationModule
  ]
})
export class AppModule {
}