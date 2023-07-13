import { CRUDRepositoryInterface } from '@fit-friends/utils/util-types';
import { NotifyTraining } from '@fit-friends/shared/app-types';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { NewTrainingEntity } from './new-training.entity';
import { NewTrainingModel } from './new-training.model';

@Injectable()
export class NewTrainingRepository implements CRUDRepositoryInterface<NewTrainingEntity, number, NotifyTraining> {
  constructor(
    @InjectModel(NewTrainingModel.name) private readonly newTrainingModel: Model<NewTrainingModel>
  ) {}

  public async create(item: NewTrainingEntity): Promise<NotifyTraining> {
    const newNewTraining = new this.newTrainingModel(item);
    return newNewTraining.save();
  }

  public async destroy(id: number): Promise<void> {
    this.newTrainingModel
      .deleteOne({ _id: id });
  }

  public async findById(id: number): Promise<NotifyTraining | null> {
    return this.newTrainingModel
      .findOne({ _id: id })
      .exec();
  }

  public async update(id: number, item: NewTrainingEntity): Promise<NotifyTraining> {
    return this.newTrainingModel
      .findByIdAndUpdate(id, item.toObject(), { new: true })
      .exec();
  }

  public async findByUserId(userId: number, dateSend: string): Promise<NotifyTraining | null> {
    return this.newTrainingModel
      .findOne({ userId, dateSend })
      .exec()
  }
}
