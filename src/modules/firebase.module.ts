/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Module, Global } from '@nestjs/common';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore/lite';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: process.env.NODE_ENV === 'production' ? '.env.prod' : '.env', // Default to .env if not in production
      isGlobal: true, // Makes ConfigModule available throughout the app
    }),
  ],
  providers: [
    {
      provide: 'FIRESTORE_DB',
      useFactory: (configService: ConfigService) => {
        const firebaseConfig = {
          apiKey: configService.get<string>('API_KEY'),
          authDomain: configService.get<string>('AUTH_DOMAIN'),
          projectId: configService.get<string>('PROJECT_ID'),
          storageBucket: configService.get<string>('STORAGE_BUCKET'),
          messagingSenderId: configService.get<string>('MESSAGING_SENDER_ID'),
          appId: configService.get<string>('APP_ID'),
        };
        const firebaseApp = initializeApp(firebaseConfig);
        return getFirestore(firebaseApp);
      },
      inject: [ConfigService],
    },
  ],
  exports: ['FIRESTORE_DB'],
})
export class FirebaseModule {}
