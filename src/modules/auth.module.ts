import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from 'src/auth/jwt.strategy';
import { LocalStrategy } from 'src/auth/local.strategy';
import { AuthController } from 'src/controllers';
import { AuthService, UserService } from 'src/services';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: process.env.SECRET_KEY,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy, UserService],
  controllers: [AuthController],
})
export class AuthModule {}
