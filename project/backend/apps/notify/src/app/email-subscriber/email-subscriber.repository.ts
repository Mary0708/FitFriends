import { CRUDRepositoryInterface } from '@fit-friends/utils/util-types';
import { EmailSubscriberEntity } from './email-subscriber.entity';
import { Subscriber } from '@fit-friends/shared/app-types';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { EmailSubscriberModel } from './email-subscriber.model';
import { Model } from 'mongoose';

@Injectable()
export class EmailSubscriberRepository implements CRUDRepositoryInterface<EmailSubscriberEntity, number, Subscriber> {
  constructor(
    @InjectModel(EmailSubscriberModel.name) private readonly emailSubscriberModel: Model<EmailSubscriberModel>
  ) {}

  public async create(item: EmailSubscriberEntity): Promise<Subscriber> {
    const newEmailSubscriber = new this.emailSubscriberModel(item);
    return newEmailSubscriber.save();
  }

  public async destroy(id: number): Promise<void> {
    this.emailSubscriberModel
      .deleteOne({ _id: id });
  }

  public async findById(id: number): Promise<Subscriber | null> {
    return this.emailSubscriberModel
      .findOne({ _id: id })
      .exec();
  }

  public async update(id: number, item: EmailSubscriberEntity): Promise<Subscriber> {
    return this.emailSubscriberModel
      .findByIdAndUpdate(id, item.toObject(), { new: true })
      .exec();
  }

  public async findByEmail(email: string): Promise<Subscriber | null> {
    return this.emailSubscriberModel
      .findOne({ email })
      .exec()
  }
}
