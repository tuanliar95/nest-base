import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { FirebaseModule } from './firebase.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath:
        process.env['NODE_ENV'] === 'production' ? '.env.production' : '.env',
      isGlobal: true,
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '1h' },
      }),
      inject: [ConfigService],
    }),
    FirebaseModule,
  ],
  controllers: [],
  providers: [AuthService],
  exports: [JwtModule, AuthService],
})
export class SharedModule { }
