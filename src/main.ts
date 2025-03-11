/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

const firebaseConfig = {
  apiKey: 'AIzaSyDvt5D2QN7uqdhtp4ZL9VR8y5wRe228o20',
  authDomain: 'my-store-5fa75.firebaseapp.com',
  projectId: 'my-store-5fa75',
  storageBucket: 'my-store-5fa75.firebasestorage.app',
  messagingSenderId: '331764581660',
  appId: '1:331764581660:web:d84e59d3b6fd4607f466d9',
};
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Cats example')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .addTag('cats')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
