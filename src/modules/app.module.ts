import { Module } from '@nestjs/common';
import * as controllers from 'src/controllers';
import * as services from 'src/services';
import { FirebaseModule } from './firebase.module';
import { JwtService } from '@nestjs/jwt';
import { AuthModule } from './auth.module';

@Module({
  imports: [FirebaseModule, AuthModule],
  controllers: [...Object.values(controllers)],
  providers: [...Object.values(services), JwtService],
})
export class AppModule {}
