import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersSubscriptionsModel, UsersSubscriptionsSchema } from './subscriptions.model';
import { UsersSubscriptionsRepository } from './users-subscriptions.repository';
import { SubscriptionsService } from './users-subscriptions.service';
import { SubscriptionsController } from './subscriptions.controller';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { getRabbitMQOptions } from '@fit-friends/utils/util-core';
import { NotifyModule } from '../notify/notify.module';
import { UsersModule } from '../user/user.module.js';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: UsersSubscriptionsModel.name, schema: UsersSubscriptionsSchema }
    ]),

    RabbitMQModule.forRootAsync(
      RabbitMQModule,
      getRabbitMQOptions('rabbit')
    ),
    NotifyModule,
    UsersModule
  ],
  controllers: [SubscriptionsController],
  providers: [SubscriptionsService, UsersSubscriptionsRepository],
  exports: [SubscriptionsService]
})
export class UsersSubscriptionsModule { }
