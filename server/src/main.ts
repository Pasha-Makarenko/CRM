import { NestFactory } from "@nestjs/core"
import { AppModule } from "./app.module"
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger"

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.setGlobalPrefix("api")

  const config = new DocumentBuilder()
    .setTitle("CRM")
    .setDescription("Server side CRM application")
    .setVersion("1.0.0")
    .build()

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup("/api/docs", app, document)

  await app.listen(process.env.PORT ?? 3000)
}

bootstrap()
