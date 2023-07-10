import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TrainingOrdersModel, TrainingOrdersSchema } from './training-orders.model';
import { TrainingOrdersRepository } from './training-orders.repository';
import { TrainingModule } from '../training/training.module';
import { TrainingOrdersController } from './training-orders.controller';
import { TrainingOrdersService } from './training-orders.service';
import { GymsModule } from '../gyms/gym.module.js';

@Module({
  imports: [
    TrainingModule,
    GymsModule,
    MongooseModule.forFeature([
    { name: TrainingOrdersModel.name, schema: TrainingOrdersSchema }
  ])
  ],
  controllers: [TrainingOrdersController],
  providers: [TrainingOrdersService, TrainingOrdersRepository],
  exports: [TrainingOrdersRepository, TrainingOrdersService]
})
export class TrainingOrdersModule {}
