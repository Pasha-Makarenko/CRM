import { Module } from "@nestjs/common"
import { OrdersController } from "./orders.controller"
import { OrdersService } from "./orders.service"
import { SequelizeModule } from "@nestjs/sequelize"
import { User } from "../users/users.model"
import { Order } from "./orders.model"
import { UsersService } from "../users/users.service"

@Module({
  controllers: [ OrdersController ],
  providers: [ OrdersService ],
  imports: [
    SequelizeModule.forFeature([ Order, User ]),
    UsersService
  ],
  exports: [ OrdersService ]
})
export class OrdersModule {
}
