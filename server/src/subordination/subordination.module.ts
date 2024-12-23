import { Module } from "@nestjs/common"
import { SubordinationController } from "./subordination.controller"
import { SubordinationService } from "./subordination.service"

@Module({
  controllers: [ SubordinationController ],
  providers: [ SubordinationService ]
})
export class SubordinationModule {
}
