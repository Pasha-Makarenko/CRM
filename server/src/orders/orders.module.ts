import { Module } from "@nestjs/common"
import { OrdersController } from "./orders.controller"
import { OrdersService } from "./orders.service"
import { SequelizeModule } from "@nestjs/sequelize"
import { User } from "../users/users.model"
import { Order } from "./orders.model"

@Module({
  controllers: [ OrdersController ],
  providers: [ OrdersService ],
  imports: [
    SequelizeModule.forFeature([ Order, User ])
  ],
  exports: [ OrdersService ]
})
export class OrdersModule {
}
