import { Module } from "@nestjs/common"
import { OrdersController } from "./orders.controller"
import { OrdersService } from "./orders.service"
import { SequelizeModule } from "@nestjs/sequelize"
import { User } from "../users/users.model"
import { Order } from "./orders.model"
import { UsersModule } from "../users/users.module"
import { AuthModule } from "../auth/auth.module"

@Module({
  controllers: [ OrdersController ],
  providers: [ OrdersService ],
  imports: [
    SequelizeModule.forFeature([ Order, User ]),
    AuthModule,
    UsersModule
  ],
  exports: [ OrdersService ]
})
export class OrdersModule {
}
