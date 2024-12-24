import { forwardRef, Module } from "@nestjs/common"
import { UsersController } from "./users.controller"
import { UsersService } from "./users.service"
import { SequelizeModule } from "@nestjs/sequelize"
import { User } from "./users.model"
import { AuthModule } from "../auth/auth.module"
import { Order } from "../orders/orders.model"

@Module({
  controllers: [ UsersController ],
  providers: [ UsersService ],
  imports: [
    SequelizeModule.forFeature([ User, Order ]),
    forwardRef(() => AuthModule)
  ],
  exports: [
    UsersService
  ]
})
export class UsersModule {
}
