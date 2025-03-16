import { Module } from '@nestjs/common';
import { UserService } from 'src/services';

@Module({
  providers: [UserService],
  exports: [UserService],
})
export class UsersModule {}
