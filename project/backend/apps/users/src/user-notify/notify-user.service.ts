import { Injectable} from '@nestjs/common';
import { NotifyUserRepository } from './notify-user.repository';
import { NotifyMessage } from '@fit-friends/shared/app-types';
import { NotifyUserEntity } from './notify-user.entity';


@Injectable()
export class NotifyUserService {
  constructor(
    private readonly notifyUserRepository: NotifyUserRepository,
  ) {}

  public async create(userId: string, notifyUserId: string, notifyType: NotifyMessage ) {
    const currentDate = new Date();
    const item = {
      userId: notifyUserId,
      initiatorId: userId,
      text: notifyType,
      dateNotify: currentDate
    }

    const notifyUserEntity = new NotifyUserEntity(item);
    return await this.notifyUserRepository.create(notifyUserEntity);
  }

    public async getNotifyUsers(userId: string) {
    return this.notifyUserRepository.findByUserId(userId);
  }

    public async getNotifyId(id: number) {
    return this.notifyUserRepository.findById(id);
  }

  public async deleteNotify(id: number) {
    return this.notifyUserRepository.destroy(id);
  }
}
