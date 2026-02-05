import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 2. Activar validación global
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Delete fields unexistent on the DTO
      forbidNonWhitelisted: true, // Throw error if trash fields are sended
      transform: true, // Automatic type conversion
    }),
  );

  // Enable CORS for the Frontend
  app.enableCors();

  await app.listen(3000);
}
bootstrap();
