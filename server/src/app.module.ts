import { Module } from "@nestjs/common"
import { ConfigModule, ConfigService } from "@nestjs/config"
import { SequelizeModule } from "@nestjs/sequelize"
import { getSequelizeConfig } from "./config/database.config"
import { UsersModule } from "./users/users.module"
import { RolesModule } from "./roles/roles.module"
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${ process.env.NODE_ENV }.env`,
      isGlobal: true
    }),
    SequelizeModule.forRootAsync({
      imports: [ ConfigModule ],
      useFactory: getSequelizeConfig,
      inject: [ ConfigService ]
    }),
    UsersModule,
    RolesModule,
    AuthModule
  ]
})
export class AppModule {
}