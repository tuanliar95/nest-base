import { Module } from '@nestjs/common';
import * as controllers from 'src/controllers';
import * as services from 'src/services';
import { FirebaseModule } from './firebase.module';

@Module({
  imports: [FirebaseModule],
  controllers: [...Object.values(controllers)],
  providers: [...Object.values(services)],
})
export class AppModule {}
