import { Logger, Module } from '@nestjs/common';
import { RequestService } from './request.service';
import { RequestController } from './request.controller';
import { RequestRepository } from './request.repository';
import { UsersModule } from 'apps/users/src/user/user.module';

@Module({
  imports: [
    UsersModule,
  ],
  providers: [
    RequestService,
    RequestRepository,
    Logger
  ],
  controllers: [RequestController],
})
export class RequestModule { }
