import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { UserSubscription } from '@fit-friends/shared/app-types';

@Schema({
  collection: 'users_subscriptions',
  timestamps: true,
})
export class UsersSubscriptionsModel extends Document implements UserSubscription {
  @Prop()
  public userId: number;

  @Prop()
  public coachId: number;
}

export const UsersSubscriptionsSchema = SchemaFactory.createForClass(UsersSubscriptionsModel);
