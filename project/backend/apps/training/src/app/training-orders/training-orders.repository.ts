import { CRUDRepositoryInterface } from '@fit-friends/utils/util-types';
import { Injectable } from '@nestjs/common';
import { SomeObject, Order } from '@fit-friends/shared/app-types';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { TrainingOrdersEntity } from './training-orders.entity';
import { TrainingOrdersModel } from './training-orders.model';
import { TrainingOrdersQuery } from './query/training-orders.query.js';

@Injectable()
export class TrainingOrdersRepository implements CRUDRepositoryInterface<TrainingOrdersEntity, number, Order> {
  constructor(
    @InjectModel(TrainingOrdersModel.name) private readonly ordersModel: Model<TrainingOrdersModel>) {
  }

  public async create(item: TrainingOrdersEntity): Promise<Order> {
    const newTraining = new this.ordersModel(item);
    return newTraining.save();
  }

  public async destroy(id: number): Promise<void> {
    await this.ordersModel.deleteOne({_id: id});
  }

  public async findById(id: number): Promise<Order | null> {
    return this.ordersModel
      .findOne({_id: id})
      .exec();
  }

  public async findByCoachId(coachId: number, query: TrainingOrdersQuery): Promise<Order[]> {
    const {limit, sortCount, sortPrice,  page}= query;
    const pageNum = page? (page-1) : 0;
    const skip = pageNum*limit;

    const objSort: SomeObject = {};
    const keys = Object.keys(query);
    keys.forEach(key => {
      key === 'sortCount'? objSort.trainingCount = sortCount : '';
      key === 'sortPrice'? objSort.totalPrice = sortPrice : '';
    });

    return this.ordersModel
    .aggregate([
        {$match: { $and: [
          {coachId: coachId},
          {isDone: false}
        ]}},
        {
          $addFields: {
            trainingObjectId: {'$toObjectId': '$trainingId'},
          }
        },
        {$lookup: {
          from: 'training',
          localField: 'trainingObjectId',
          foreignField: '_id',
          as: 'result'
        },
      },
      { $unwind: '$result',},
      { $group: {
        _id: {
          trainingId: '$trainingId',
          title: "$result.title",
          backgroundImage: "$result.backgroundImage",
          level: "$result.level",
          trainingStyle: "$result.trainingStyle",
          trainingTime: "$result.trainingTime",
          price: "$result.price",
          caloriesLoss: "$result.caloriesLoss",
          description: "$result.description",
          gender: "$result.gender",
          video: "$result.video",
          rating: "$result.rating",
          isSpecial: "$result.isSpecial",},
          totalPrice: { $sum: '$totalPrice' },
          trainingCount: { $sum: '$trainingRestCount' },
      }
    },
      {
        $project:{_id: 0,
              title:  "$_id.title",
              backgroundImage: "$_id.backgroundImage",
              level: "$_id.level",
              trainingStyle: "$_id.trainingStyle",
              trainingTime: "$_id.trainingTime",
              price: "$_id.price",
              caloriesLoss: "$_id.caloriesLoss",
              description: "$_id.description",
              gender: "$_id.gender",
              video: "$_id.video",
              rating: "$_id.rating",
              isSpecial: "$_id.isSpecial",
              trainingCount: 1,
              totalPrice: 1
        }
    },
      { $unset: 'result' },
      { $limit: skip + limit},
      { $skip:  skip },
      { $sort:  objSort }
     ])
    .exec();
  }

  public async findByUserId(userId: string, query: TrainingOrdersQuery): Promise<Order[]> {
    const {limit, sortCount, sortPrice,  page}= query;
    const pageNum = page? (page-1) : 0;
    const skip = pageNum*limit;

    const objSort: SomeObject = {};
    const keys = Object.keys(query);
    keys.forEach(key => {
      key === 'sortCount'? objSort.trainingCount = sortCount : '';
      key === 'sortPrice'? objSort.totalPrice = sortPrice : '';
    });
    return this.ordersModel
    .aggregate([
        {$match: { $and: [
          {isDone: false},
          {userId: userId},

        ]}},
        {
          $addFields: {
            trainingObjectId: {'$toObjectId': '$trainingId'},
          }
        },
        {$lookup: {
          from: 'training',
          localField: 'trainingObjectId',
          foreignField: '_id',
          as: 'result'
        },
      },
      { $unwind: '$result',},
      { $group: {
        _id: {
          trainingId: '$trainingId',
          title: "$result.title",
          backgroundImage: "$result.backgroundImage",
          level: "$result.level",
          trainingStyle: "$result.trainingStyle",
          trainingTime: "$result.trainingTime",
          price: "$result.price",
          caloriesLoss: "$result.caloriesLoss",
          description: "$result.description",
          gender: "$result.gender",
          video: "$result.video",
          rating: "$result.rating",
          isSpecial: "$result.isSpecial",},
          totalPrice: { $sum: '$totalPrice' },
          trainingCount: { $sum: '$trainingRestCount' },
      }
    },
      {
        $project:{_id: 0,
              title:  "$_id.title",
              backgroundImage: "$_id.backgroundImage",
              level: "$_id.level",
              trainingStyle: "$_id.trainingStyle",
              trainingTime: "$_id.trainingTime",
              price: "$_id.price",
              caloriesLoss: "$_id.caloriesLoss",
              description: "$_id.description",
              gender: "$_id.gender",
              video: "$_id.video",
              rating: "$_id.rating",
              isSpecial: "$_id.isSpecial",
              trainingCount: 1,
              totalPrice: 1
        }
    },
      { $unset: 'result' },
      { $limit: skip + limit},
      { $skip:  skip },
      { $sort:  objSort }
     ])
    .exec();
  }

  public async update(id: number, item: TrainingOrdersEntity): Promise<Order> {
    return this.ordersModel
      .findByIdAndUpdate(id, item.toObject(), {new: true})
      .exec();
  }


}
