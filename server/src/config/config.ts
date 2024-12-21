import { ConfigModuleOptions } from "@nestjs/config"

export const config: ConfigModuleOptions = {
  envFilePath: `.${ process.env.NODE_ENV }.env`,
  isGlobal: true
}