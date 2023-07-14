import { Entity } from '@fit-friends/utils/util-core';
import { Subscriber } from '@fit-friends/shared/app-types';

export class EmailSubscriberEntity implements Entity<EmailSubscriberEntity, Subscriber>, Subscriber {
  public id: number;
  public email: string;
  public name: string;
  public userId: number;

  constructor(emailSubscriber: Subscriber) {
    this.fillEntity(emailSubscriber);
  }

  public fillEntity(entity) {
    this.email = entity.email;
    this.name = entity.name;
    this.id = entity.id ?? '';
  }

  public toObject(): EmailSubscriberEntity {
    return { ...this };
  }
}
