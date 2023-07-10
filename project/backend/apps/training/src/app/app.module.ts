import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { getMongooseOptions } from '@fit-friends/utils/util-core';
import { ConfigTrainingModule } from '@fit-friends/config/config-training';
import { TrainingModule } from './training/training.module';
import { TrainingOrdersModule } from './training-orders/training-orders.module';
import { NotifyUserModule } from './notify-user/notify-user.module';
import { TrainingRequestModule } from './training-request/training-request.module';
import { GymsModule } from './gyms/gym.module.js';
import { CommentsModule } from './comments/comments.module.js';

@Module({
  imports: [
    TrainingModule,
    TrainingOrdersModule,
    ConfigTrainingModule,
    MongooseModule.forRootAsync(getMongooseOptions('application.db')),
    NotifyUserModule,
    TrainingRequestModule,
    GymsModule,
    CommentsModule
   ],
  controllers: [],
  providers: [],
})
export class AppModule {}
