/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Module } from '@nestjs/common';
import { AuthController } from 'src/controllers/auth.controller';
import { UserService } from 'src/services';
import { AuthService } from 'src/services/auth.service';
import { UsersModule } from './user.module';

@Module({
  imports: [UsersModule],
  providers: [AuthService, UserService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
