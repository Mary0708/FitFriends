import { NotifyMessage, NotifyUser } from '@fit-friends/shared/app-types';

export class NotifyUserEntity implements NotifyUser {
  public _id: number;
  public userId: string;
  public initiatorId: string;
  public text: NotifyMessage;
  public dateNotify: Date;

  constructor(entity: NotifyUser) {
    this.fillEntity(entity);
  }

  public toObject() {
    return {...this};
  }

  public fillEntity(entity: NotifyUser) {
    this._id = entity.id;
    this.userId = entity.userId;
    this.initiatorId = entity.initiatorId;
    this.text = entity.text;
    this.dateNotify = entity.dateNotify;
  }

}
