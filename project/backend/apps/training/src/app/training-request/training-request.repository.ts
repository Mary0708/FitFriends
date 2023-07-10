import { Injectable } from '@nestjs/common';
import { RequestStatus, RequestStatusType, TrainingRequest} from '@fit-friends/shared/app-types';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { TrainingRequestEntity } from './training-request.entity';
import { TrainingRequestModel } from './training-request.model';
import { RequestSort, RequestQuery as RQ, RequestSortField, CRUDRepositoryInterface, PrismaService } from '@fit-friends/utils/util-types'
import { RequestQuery } from './query/request.query.js';

@Injectable()
export class TrainingRequestRepository implements CRUDRepositoryInterface<TrainingRequestEntity, number, TrainingRequest> {
  constructor(private readonly prisma: PrismaService) { }


  public async create(item: TrainingRequestEntity): Promise<TrainingRequest> {
    const newTrainingRequest = new this.prisma.request(item);
    return newTrainingRequest.save();
  }

  public async destroy(id: number): Promise<void> {
    await this.prisma.request.deleteOne({_id: id});
  }

  public async findById(id: number): Promise<TrainingRequest | null> {
    return this.prisma.request
      .findOne({_id: id})
      .exec();
  }

  public async findId(initiatorId: string, userId: string): Promise<TrainingRequest | null> {
    return this.prisma.request
      .findOne({initiatorId: initiatorId, userId: userId})
      .exec();
  }

  public async find({
    limit = RQ.REQUEST_QUERY_MAX,
    page = RQ.REQUEST_DEFAULT_PAGE,
    sortDirection = RQ.REQUEST_DEFAULT_SORT_DIRECTION,
    sortType = RequestSort.Date,
    category,
    requestStatus,
    initiatorId,
  }: RequestQuery, options?: Record<string, unknown>): Promise<TrainingRequest[]> {
    const sortField = { [RequestSortField[sortType]]: sortDirection };

    return this.prisma.request.findMany({
      take: limit,
      where: {
        ...options ?? {},
        category: { in: category },
        requestStatus: { in: requestStatus },
        initiatorId,
      },
      orderBy: [
        {
          ...sortField
        }
      ],
      skip: page > 0 ? limit * (page - 1) : undefined,
    });
  }

  public async updateStatus(id: number, newStatus: RequestStatusType): Promise<TrainingRequest | null> {
    const currentDate = new Date();
    return this.prisma.request
      .findOneAndUpdate({_id:id}, {requestStatus: newStatus, dateUpd: currentDate}, {new: true})
      .exec();
  }

  public async update(id: number, item: Partial<TrainingRequestEntity>): Promise<TrainingRequest> {
    return this.prisma.request.update({
      where: { id },
      data: {
        ...item,
      },
    })
  }

}
