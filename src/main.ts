/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './modules/app.module';
import * as dotenv from 'dotenv';

dotenv.config({
  path: process.env.NODE_ENV === 'production' ? '.env.prod' : '.env',
});
async function bootstrap() {
  console.log('hahahahah', process.env.NODE_ENV);
  console.log('JWT_SECRET:', process.env.JWT_SECRET); // Log the JWT_SECRET to ensure it's loaded

  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  const config = new DocumentBuilder()
    .setTitle('My storage example')
    .setDescription('The storage API description')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
      'access-token',
    )
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
