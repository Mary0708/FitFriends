import { Inject, Injectable } from '@nestjs/common';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { uploaderConfig } from '@fit-friends/config/config-uploader';
import { ConfigType } from '@nestjs/config';
import {  RabbitRouting } from '@fit-friends/shared/app-types';

@Injectable()
export class AvatarsService {
  constructor(
    private readonly rabbitClient: AmqpConnection,
    @Inject(uploaderConfig.KEY)
    private readonly rabbiOptions: ConfigType<typeof uploaderConfig>,
  ) {}

  public async userAvatars(userId: number, fileId: string) {
    return this.rabbitClient.request<string>(
      {exchange: 'fitfriends.uploader',
      routingKey: RabbitRouting.UserAvatars,
      payload: {userId, fileId}}
    );
  }

  public async coachCertificate(coachId: number, fileId: string) {
    return this.rabbitClient.request<string>(
      {exchange: 'fitfriends.uploader',
      routingKey: RabbitRouting.CoachCertificate,
      payload: {coachId, fileId}}
    );
  }


  public async userBackgroundImg(userId: number, fileId: string) {
    return this.rabbitClient.request<string>(
      {exchange: 'fitfriends.uploader',
      routingKey: RabbitRouting.UserBackgroundImg,
      payload: {userId, fileId}}
    );
  }
}
