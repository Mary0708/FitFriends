import { Document} from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { UserLevel, Training, TrainingTime, TrainingStyle, UserGender, TrainingTimeType } from '@fit-friends/shared/app-types';

@Schema({
  collection: 'training',
  timestamps: true,
})
export class TrainingModel extends Document implements Training {

  @Prop({
    required: true,
  })
  public title: string;

  @Prop({
    required: true,
  })
  public backgroundImage: string;

  @Prop({
    required: true,
    type: String,
    enum: UserLevel})
  public level: UserLevel;

  @Prop({
    required: true,
    type: String,
    enum: TrainingStyle})
  public trainingStyle: TrainingStyle;

  @Prop({
    required: true,
    type: String,
    enum: TrainingTime,
  })
  public trainingTime: TrainingTimeType;

  @Prop({
    required: true,
  })
  public price: number;

  @Prop({
    required: true,
  })
  public caloriesLoss: number;

  @Prop({
    required: true,
  })
  public description: string;

  @Prop({
    required: true,
    type: String,
    enum: UserGender
  })
  public gender: UserGender;

  @Prop()
  public video: string;

  @Prop({
    required: true,
  })
  public rating: number;

  @Prop({
    required: true,
  })
  public coachId: number;

  @Prop({
    required: true,
  })
  public isSpecial: boolean;
}

export const TrainingSchema = SchemaFactory.createForClass(TrainingModel);
