import { Entity } from '@fit-friends/utils/util-core';
import { NotifyTraining, TrainingForSend } from '@fit-friends/shared/app-types';

export class NewTrainingEntity implements Entity<NewTrainingEntity, NotifyTraining>, NotifyTraining {
  public id: number;
  public training: TrainingForSend[];
  public userId: string;
  public email: string;
  public dateSend: string;

  constructor(emailSubscriber: NotifyTraining) {
    this.fillEntity(emailSubscriber);
  }

  public fillEntity(entity) {
    this.training = entity.training;
    this.userId = entity.userId;
    this.email = entity.email;
    this.dateSend = entity.dateSend;
    this.id = entity.id ?? '';
  }

  public toObject(): NewTrainingEntity {
    return { ...this };
  }
}
