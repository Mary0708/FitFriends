import { Document} from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Order, PaymentOption } from '@fit-friends/shared/app-types';

@Schema({
  collection: 'trainingOrders',
  timestamps: true,
})
export class TrainingOrdersModel extends Document implements Order  {

  @Prop({
    required: true,
  })
  public userId: string;

  @Prop({
    required: true,
  })
  public coachId: number;

  @Prop({
    required: true,
  })
  public orderType: string;

  @Prop({
    required: true})
  public trainingId: number;

  @Prop({
    required: true})
  public trainingCount: number;

  @Prop({
    required: true
  })
  public totalPrice: number;

  @Prop({
    required: true
  })
  public price: number;

  @Prop({
    required: true,
    type: String,
    enum: PaymentOption
  })
  public paymentOption: PaymentOption;

  @Prop({
    required: true,
    default: 0
  })
  public trainingDoneCount: number;

  @Prop({
    required: true
  })
  public trainingRestCount: number;


  @Prop({
    required: true,
    default: false
  })
  public isDone: boolean;
}

export const TrainingOrdersSchema = SchemaFactory.createForClass(TrainingOrdersModel);
