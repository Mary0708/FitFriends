import { Entity } from '@fit-friends/utils/util-core';
import { NotifyMessage, NotifyUser } from '@fit-friends/shared/app-types';

export class UserNotifyEntity implements Entity<UserNotifyEntity, NotifyUser>, NotifyUser {
  public id: number;
  public userId: number;
  public initiatorId: number;
  public initiatorName: string;
  public email: string;
  public text: NotifyMessage;
  public dateNotify: Date;

  constructor(item: NotifyUser) {
    this.fillEntity(item);
  }

  public fillEntity(entity) {
    this.userId = entity.userId;
    this.initiatorId = entity.initiatorId;
    this.initiatorName = entity.v;
    this.email = entity.email;
    this.text = entity.text;
    this.dateNotify = entity.dateNotify;
    this.id = entity.id ?? '';
  }

  public toObject(): UserNotifyEntity {
    return { ...this };
  }
}
