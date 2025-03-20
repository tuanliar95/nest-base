import { Module } from '@nestjs/common';
import { AuthModule } from '@shared/auth.module';
import { SharedModule } from '@shared/shared.module';
import * as controllers from './app.controller';
import * as services from './app.service';

@Module({
  imports: [
    // ConfigModule.forRoot({
    //   envFilePath:
    //     process.env.NODE_ENV === 'production' ? '.env.production' : '.env',
    //   isGlobal: true,
    // }),

    SharedModule,
    AuthModule,
    // JwtModule.registerAsync({
    //   imports: [ConfigModule],
    //   useFactory: (configService: ConfigService) => ({
    //     secret: configService.get<string>('JWT_SECRET'),
    //     signOptions: { expiresIn: '1h' },
    //   }),
    //   inject: [ConfigService],
    // }),
  ],
  controllers: [...Object.values(controllers)],
  providers: [...Object.values(services)],
})
export class AppModule { }
