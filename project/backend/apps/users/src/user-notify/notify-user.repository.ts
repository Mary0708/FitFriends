import { CRUDRepositoryInterface } from '@fit-friends/utils/util-types';
import { Injectable } from '@nestjs/common';
import { NotifyUser } from '@fit-friends/shared/app-types';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { NotifyUserEntity } from './notify-user.entity';
import { NotifyUserModel } from './notify-user.model';
import { LIMIT_SHOW_NOTIFY } from './notify-user.constant';


@Injectable()
export class NotifyUserRepository implements CRUDRepositoryInterface<NotifyUserEntity, number, NotifyUser> {
  constructor(
    @InjectModel(NotifyUserModel.name) private readonly notifyDateModel: Model<NotifyUserModel>) {
  }

  public async create(item: NotifyUserEntity): Promise<NotifyUser> {
    const newNotifyUser = new this.notifyDateModel(item);
    return newNotifyUser.save();
  }

  public async destroy(id: number): Promise<void> {
    await this.notifyDateModel.deleteOne({_id: id});
  }

  public async findById(id: number): Promise<NotifyUser | null> {
     return this.notifyDateModel
      .findOne({_id: id})
      .exec();
  }


  public async findByUserId(userId: string): Promise<NotifyUser[]> {
    return this.notifyDateModel
     .find({userId})
     .sort({dateNotify: -1})
      .limit( LIMIT_SHOW_NOTIFY )
     .exec();
 }

  public async update(id: number, item: NotifyUserEntity): Promise<NotifyUser> {
    return this.notifyDateModel
      .findByIdAndUpdate(id, item.toObject(), {new: true})
      .exec();
  }
}
