import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppConfig } from './common/config/app.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  AppConfig(app);
  await app.listen(3002);
}
bootstrap();
