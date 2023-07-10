import { Document} from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Comment } from '@fit-friends/shared/app-types';

@Schema({
  collection: 'comments',
  timestamps: true,
})
export class CommentModel extends Document implements Comment  {

  @Prop({
    required: true,
  })
  public userId: string;

  @Prop({
    required: true,
  })
  public trainingId: number;

  @Prop({
    required: true,
  })
  public ratingTraining: number;

  @Prop({
    required: true})
  public message: string;


}

export const CommentSchema = SchemaFactory.createForClass(CommentModel);
