import { NestFactory } from '@nestjs/core';
import * as express from 'express';
import { join } from 'path';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Serve static assets
  app.use('/', express.static(join(__dirname, '../..', 'frontend/build')));
  app.use(
    '/static',
    express.static(join(__dirname, '../..', 'frontend/build/static')),
  );

  await app.listen(3000);
}
bootstrap();
