import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TrainingModel, TrainingSchema } from './training.model';
import { TrainingRepository } from './training.repository';
import { TrainingController } from './training.controller';
import { TrainingService } from './training.service';

@Module({
  imports: [
    MongooseModule.forFeature([{name: TrainingModel.name, schema: TrainingSchema }]),
  ],
  controllers: [TrainingController],
  providers: [TrainingService, TrainingRepository],
  exports: [TrainingRepository, TrainingService]
})
export class TrainingModule {}
