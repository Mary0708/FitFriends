import { Inject, Injectable } from '@nestjs/common';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { trainingConfig } from '@fit-friends/config/config-training';
import { ConfigType } from '@nestjs/config';
import { RabbitRouting, TrainingRequest } from '@fit-friends/shared/app-types';

@Injectable()
export class NotifyUserService {
  constructor(
    private readonly rabbitClient: AmqpConnection,
    @Inject(trainingConfig.KEY)
    private readonly rabbiOptions: ConfigType<typeof trainingConfig>,
  ) {}

  public async trainingNotifyUser(trainingRequest: TrainingRequest) {
    return this.rabbitClient.request<TrainingRequest>(
      {exchange: 'fit-friends.training',
      routingKey: RabbitRouting.TrainingRequestNotify,
      payload: trainingRequest}
    );
  }


}
