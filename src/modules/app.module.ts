import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from 'src/auth/jwt.strategy';
import * as controllers from 'src/controllers';
import * as services from 'src/services';
import { FirebaseModule } from './firebase.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    FirebaseModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '1h' },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [...Object.values(controllers)],
  providers: [...Object.values(services), JwtStrategy],
})
export class AppModule {}
