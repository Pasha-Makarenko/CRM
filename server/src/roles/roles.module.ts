import { forwardRef, Module } from "@nestjs/common"
import { RolesService } from "./roles.service"
import { RolesController } from "./roles.controller"
import { UsersModule } from "../users/users.module"
import { AuthModule } from "../auth/auth.module"

@Module({
  providers: [ RolesService ],
  controllers: [ RolesController ],
  imports: [
    UsersModule,
    AuthModule
  ]
})
export class RolesModule {
}
