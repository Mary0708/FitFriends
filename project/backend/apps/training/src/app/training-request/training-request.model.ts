import { Document} from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { RequestStatus, RequestStatusType, TrainingRequest, RequestCategoryType, RequestCategory } from '@fit-friends/shared/app-types';

@Schema({
  collection: 'trainingRequest',
  timestamps: true,
})
export class TrainingRequestModel extends Document implements TrainingRequest {

  @Prop({
    required: true,
  })
  public initiatorId: number;

  @Prop({
    required: true,
  })
  public userId: number;

  @Prop({
    required: true,
    type: String,
    enum: RequestStatus
  })
  public requestStatus: RequestStatusType;

  @Prop({
    required: true,
    type: String,
    enum: RequestCategory
  })
  public category: RequestCategoryType;

  @Prop({
  })
  public dateUpd: Date;


}

export const TrainingRequestSchema = SchemaFactory.createForClass(TrainingRequestModel);
