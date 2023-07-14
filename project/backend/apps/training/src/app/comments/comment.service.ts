import { Injectable } from '@nestjs/common';
import { TRAINING_NOT_FOUND } from '../training/training.constant';
import { TrainingRepository } from '../training/training.repository';
import { CommentEntity } from './comment.entity';
import { CommentRepository } from './comment.repository';
import { DefaultQuery } from '../../query/default.query';
import { CommentDto } from '../../dto/comment.dto';

@Injectable()
export class CommentsService {
  constructor(
    private readonly commentRepository: CommentRepository,
    private readonly trainingRepository: TrainingRepository,
  ) {}

  public async createComment(trainingId: number, dto: CommentDto) {
    const commentEntity = await new CommentEntity({...dto, trainingId})
    const existTraining = await this.trainingRepository.findById(trainingId);
    if (!existTraining) {
      return {error: TRAINING_NOT_FOUND}
    }
    const newComment = await this.commentRepository.create(commentEntity);
    const allComments = await this.commentRepository.findByTrainingId(newComment.trainingId);
    const allRatings = allComments.map((el)=>el.rating);
    const newRating = Math.floor(allRatings.reduce((a,b)=>a+b)/allRatings.length);
    await this.trainingRepository.updateRating(newComment.trainingId, newRating);
    return newComment
  }

  public async getTrainingId(trainingId: number, query: DefaultQuery) {
    const existTraining = await this.trainingRepository.findById(trainingId);
    if (!existTraining) {
      return {error: TRAINING_NOT_FOUND}
    }
    return this.commentRepository.findByTrainingId(trainingId, query);
  }


  public async createTestData(test_data) {
    const commentEntity = await new CommentEntity(test_data)
    const newComment = await this.commentRepository.create(commentEntity);
    return newComment
  }
}
