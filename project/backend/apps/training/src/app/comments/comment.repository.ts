import { Injectable } from '@nestjs/common';
import { CommentEntity } from './comment.entity';
import { Comment } from '@fit-friends/shared/app-types';
import { InjectModel } from '@nestjs/mongoose';
import { CommentModel } from './comments.model';
import { Model } from 'mongoose';
import { DEFAULT_LIST_COUNT_LIMIT } from '@fit-friends/utils/util-types';
import { DefaultQuery } from '../../query/default.query';

@Injectable()
export class CommentRepository {
  constructor(
    @InjectModel(CommentModel.name) private readonly commentModel: Model<CommentModel>) {
  }

  public async create(item: CommentEntity): Promise<Comment> {
    const newComment = new this.commentModel(item);
    return newComment.save();
  }

  public async findByTrainingId(trainingId: number, query?: DefaultQuery): Promise<Comment[] > {
    const limitNumber = query? query.limit : DEFAULT_LIST_COUNT_LIMIT
    const pageNum = query? (query.page-1) : 0;
    const skip = pageNum*limitNumber ;

    return this.commentModel
      .find({trainingId: trainingId})
      .skip(skip)
      .limit( limitNumber )
      .exec();
  }

}
