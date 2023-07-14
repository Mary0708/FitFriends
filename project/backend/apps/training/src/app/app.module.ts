import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { getMongooseOptions } from '@fit-friends/utils/util-core';
import { ConfigTrainingModule } from '@fit-friends/config/config-training';
import { TrainingModule } from './training/training.module';
import { TrainingOrdersModule } from './training-orders/training-orders.module';
import { NotifyUserModule } from './notify-user/notify-user.module';
import { RequestModule } from './request/request.module';
import { GymsModule } from './gyms/gym.module';
import { CommentsModule } from './comments/comments.module';
import { TrainingCatalogQuery } from '../query/training-catalog.query';

@Module({
  imports: [
    TrainingModule,
    TrainingOrdersModule,
    ConfigTrainingModule,
    MongooseModule.forRootAsync(getMongooseOptions('application.db')),
    NotifyUserModule,
    RequestModule,
    GymsModule,
    CommentsModule,
    TrainingCatalogQuery
   ],
  controllers: [],
  providers: [],
})
export class AppModule {}
