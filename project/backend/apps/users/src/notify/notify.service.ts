import { Inject, Injectable } from '@nestjs/common';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { ConfigType } from '@nestjs/config';
import { RabbitRouting } from '@fit-friends/shared/app-types';
import { rabbitConfig } from '@fit-friends/config/config-users';
import { CreateSubscriberDto } from '../../../notify/src/app/email-subscriber/dto/create-subscriber.dto'
import { NotifyTrainingDto } from '../../../notify/src/app/new-training/dto/notify-training.dto'
import { NotifyUserDto } from '../../../notify/src/app/user-notify/dto/notify-user.dto'

@Injectable()
export class NotifyService {
  constructor(
    private readonly rabbitClient: AmqpConnection,
    @Inject(rabbitConfig.KEY)
    private readonly rabbiOptions: ConfigType<typeof rabbitConfig>,
  ) { }

  public async registerSubscriber(dto: CreateSubscriberDto) {
    return this.rabbitClient.publish<CreateSubscriberDto>(
      this.rabbiOptions.exchange,
      RabbitRouting.AddSubscriber,
      { ...dto }
    );
  }

  public async notifyNewTraining(dto: NotifyTrainingDto) {
    return this.rabbitClient.publish<NotifyTrainingDto>(
      this.rabbiOptions.exchange,
      RabbitRouting.AddNotifyTraining,
      { ...dto }
    );
  }

  public async notifyUser(dto: NotifyUserDto) {
    return this.rabbitClient.publish<NotifyUserDto>(
      this.rabbiOptions.exchange,
      RabbitRouting.AddUserNotify,
      { ...dto }
    );
  }
}
