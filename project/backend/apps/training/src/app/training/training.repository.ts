import { CRUDRepositoryInterface } from '@fit-friends/utils/util-types';
import { Injectable } from '@nestjs/common';
import { TrainingEntity } from './training.entity';
import { SomeObject, Training } from '@fit-friends/shared/app-types';
import { Model } from 'mongoose';
import { TrainingCatalogQuery } from '../../query/training-catalog.query.js';
import { TrainingQuery } from '../../query/training.query.js';
import { TrainingModel } from './training.model.js';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class TrainingRepository implements CRUDRepositoryInterface<TrainingEntity, number, Training> {
  constructor(
    @InjectModel(TrainingModel.name) private readonly trainingModel: Model<TrainingModel>) {
  }

  public async create(item: TrainingEntity): Promise<Training> {
    const entityData = item.toObject();
    return this.trainingModel.create({
      data: {
        ...entityData,
      }
    });
  }

  public async destroy(id: number): Promise<void> {
    this.trainingModel.deleteOne({ id: id });
  }

  public async findById(id: number): Promise<Training | null> {
    return this.trainingModel
      .findOne({ _id: id })
      .exec();
  }

  public async findByCoachId(coachId: number, query: TrainingQuery): Promise<Training[]> {
    const { limit, price, caloriesLoss, rating, trainingTime, page } = query;
    const pageNum = page ? (page - 1) : 0;

    const objFiltr: SomeObject = {};
    if (query.price) {
      objFiltr.price = {
        "$gte": price[0],
        "$lte": price[1],
      };
    }
    if (query.caloriesLoss) {
      objFiltr.caloriesLoss = {
        "$gte": caloriesLoss[0],
        "$lte": caloriesLoss[1],
      };
    }
    if (query.rating) {
      objFiltr.rating = {
        "$gte": rating[0],
        "$lte": rating[1],
      };
    }
    if (query.trainingTime) { objFiltr.trainingTime = { "$in": trainingTime }; }

    return this.trainingModel
      .find({ ...objFiltr, coachId: coachId })
      .skip(pageNum * limit)
      .limit(limit)
      .exec();
  }

  public async findCatalog(query: TrainingCatalogQuery): Promise<Training[]> {
    const { limit, price, caloriesLoss, rating, trainingStyle, sortPrice, page } = query;
    const pageNum = page ? (page - 1) : 0;

    const objFiltr: SomeObject = {};
    if (query.price) {
      objFiltr.price = {
        "$gte": price[0],
        "$lte": price[1],
      };
    }
    if (query.caloriesLoss) {
      objFiltr.caloriesLoss = {
        "$gte": caloriesLoss[0],
        "$lte": caloriesLoss[1],
      };
    }
    if (query.rating) {
      objFiltr.rating = {
        "$gte": rating[0],
        "$lte": rating[1],
      };
    }
    if (query.trainingStyle) { objFiltr.trainingStyle = { "$in": trainingStyle }; }


    const objSort: SomeObject = {};
    if (query.sortPrice) { objSort.sortPrice = sortPrice }


    return this.trainingModel
      .find({ ...objFiltr })
      .skip(pageNum * limit)
      .limit(limit)
      .exec();
  }

  public async update(id: number, item: TrainingEntity): Promise<Training> {
    return this.trainingModel
      .findByIdAndUpdate(id, item.toObject(), { new: true })
      .exec();
  }


  public async findTrainingAfterDate(date: Date, coaches: [string]): Promise<Training[]> {
    const training = await this.trainingModel
      .find({
        createdAt: { $gte: date },
        coachId: { $in: coaches }
      })
      .exec();
    return training;

  }

  public async updateRating(id: number, newRating: number): Promise<Training> {
    return this.trainingModel
      .findByIdAndUpdate(id, { rating: newRating }, { new: true })
      .exec();
  }

  public async updateImg(id: number, fileId: number): Promise<Training> {
    return this.trainingModel
      .findByIdAndUpdate(id, { backgroundImage: fileId }, { new: true })
      .exec();
  }

  public async updateVideo(id: number, fileId: string): Promise<Training> {
    return this.trainingModel
      .findByIdAndUpdate(id, { video: fileId }, { new: true })
      .exec();
  }
}
