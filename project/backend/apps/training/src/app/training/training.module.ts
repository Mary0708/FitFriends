import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TrainingModel, TrainingSchema } from './training.model';
import { TrainingRepository } from './training.repository';
import { TrainingController } from './training.controller';
import { TrainingService } from './training.service';
import { TrainingRdo } from './rdo/training.rdo';
import { UsersModule } from '../../../../users/src/user/user.module'
import { UserBalanceModule } from '../../../../users/src/user-balance/user-balance.module'

@Module({
  imports: [
    UsersModule,
    UserBalanceModule,
    MongooseModule.forFeature([{name: TrainingModel.name, schema: TrainingSchema }]),
  ],
  controllers: [TrainingController],
  providers: [TrainingService, TrainingRepository],
  exports: [TrainingRepository, TrainingService, TrainingRdo]
})
export class TrainingModule {}
