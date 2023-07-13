import { UserSubscription } from '@fit-friends/shared/app-types';

export class SubscriptionEntity implements UserSubscription {
  public _id: string;
  public userId: number;
  public coachId: number;

  constructor(userSubscription: UserSubscription) {
    this.fillEntity(userSubscription);
  }

  public toObject() {
    return {...this};
  }

  public fillEntity(userSubscription: UserSubscription) {
    this._id = userSubscription._id;
    this.userId = userSubscription.userId;
    this.coachId = userSubscription.coachId;
  }

}
