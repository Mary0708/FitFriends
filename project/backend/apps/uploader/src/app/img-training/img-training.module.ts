import { Module } from '@nestjs/common';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { getRabbitMQOptions } from '@fit-friends/utils/util-core';
import { ImgTrainingService } from './img-training.service';

@Module({
  imports: [
    RabbitMQModule.forRootAsync(
      RabbitMQModule,
      getRabbitMQOptions('application.rabbit')
    )
  ],
  providers: [ImgTrainingService],
  exports: [ImgTrainingService]
})
export class ImgTrainingModule {}
