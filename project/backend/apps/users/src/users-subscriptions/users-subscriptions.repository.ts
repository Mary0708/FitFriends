import { Injectable } from '@nestjs/common';
import { SubscriptionEntity } from './subscriptions.entity';
import { UserSubscription } from '@fit-friends/shared/app-types';
import { UsersSubscriptionsModel } from './subscriptions.model';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CRUDRepositoryInterface } from '@fit-friends/utils/util-types';

@Injectable()
export class UsersSubscriptionsRepository implements CRUDRepositoryInterface<SubscriptionEntity, string, UserSubscription> {
  constructor(
    @InjectModel(UsersSubscriptionsModel.name) private readonly usersSubscriptionsModel: Model<UsersSubscriptionsModel>) {
  }

  public async create(item: SubscriptionEntity): Promise<UserSubscription> {
    const newUsersSubscriptions = new this.usersSubscriptionsModel(item);
    return newUsersSubscriptions.save();
  }

  public async destroy(id: string): Promise<void> {
    this.usersSubscriptionsModel.deleteOne({id});
  }

  public async delete(userId: number, coachId: number): Promise<UserSubscription> {
    const result = await this.usersSubscriptionsModel.findOneAndDelete({userId: userId, coachId: coachId});
    return result
  }

  public async findById(id: string): Promise<UserSubscription | null> {
     return this.usersSubscriptionsModel
      .findOne({_id: id})
      .exec();
  }

  public async findByUserId(userId: number): Promise<UserSubscription[]> {
    return this.usersSubscriptionsModel
     .find({userId: userId})
     .exec();
 }

  public async findByCoachId(coachId: number): Promise<UserSubscription[]> {
    return this.usersSubscriptionsModel
     .find({coachId: coachId})
     .exec();
 }

 public async findSubscriptionByUserId(userId: number, coachId: number): Promise<UserSubscription> {
  return this.usersSubscriptionsModel
   .findOne({userId: userId, coachId: coachId})
   .exec();
}

  public async update(id: string, item: SubscriptionEntity): Promise<UserSubscription> {
    return this.usersSubscriptionsModel
      .findByIdAndUpdate(id, item.toObject(), {new: true})
      .exec();
  }
}
