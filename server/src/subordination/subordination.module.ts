import { Module } from "@nestjs/common"
import { SubordinationController } from "./subordination.controller"
import { SubordinationService } from "./subordination.service"
import { UsersModule } from "../users/users.module"
import { AuthModule } from "../auth/auth.module"

@Module({
  controllers: [ SubordinationController ],
  providers: [ SubordinationService ],
  imports: [
    UsersModule,
    AuthModule
  ]
})
export class SubordinationModule {
}
