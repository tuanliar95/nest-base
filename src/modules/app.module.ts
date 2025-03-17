import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from 'src/auth/jwt.strategy';
import * as controllers from 'src/controllers';
import * as services from 'src/services';
import { FirebaseModule } from './firebase.module';

@Module({
  imports: [
    FirebaseModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [...Object.values(controllers)],
  providers: [...Object.values(services), JwtStrategy],
})
export class AppModule {}
