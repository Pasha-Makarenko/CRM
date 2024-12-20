import { Module } from "@nestjs/common"
import { ConfigModule, ConfigService } from "@nestjs/config"
import { SequelizeModule } from "@nestjs/sequelize"
import { getSequelizeConfig } from "./config/database.config"
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    SequelizeModule.forRootAsync({
      imports: [ ConfigModule ],
      useFactory: getSequelizeConfig,
      inject: [ ConfigService ]
    }),
    UsersModule
  ]
})
export class AppModule {
}