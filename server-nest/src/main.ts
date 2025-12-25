import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';

async function bootstrap() {
  dotenv.config();
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  const port = process.env.PORT_NEST || 4000;
  await app.listen(port, '0.0.0.0');
  console.log(`NestJS backend running on port ${port} (bound to 0.0.0.0)`);
}
bootstrap();
