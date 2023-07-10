import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigNotifyModule } from '@fit-friends/config/config-notify';
import { getMongooseOptions } from '@fit-friends/utils/util-core';
import { EmailSubscriberModule } from './email-subscriber/email-subscriber.module';
import { NewTrainingModule } from './new-training/new-training.module';
import { UserNotifyModule } from './user-notify/user-notify.module';


@Module({
  imports: [
    ConfigNotifyModule,
    MongooseModule.forRootAsync(getMongooseOptions('application.db')),
    EmailSubscriberModule,
    NewTrainingModule,
    UserNotifyModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
