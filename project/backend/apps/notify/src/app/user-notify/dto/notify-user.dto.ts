import { NotifyMessage } from '@fit-friends/shared/app-types';

export class NotifyUserDto {
  public userId: string;
  public initiatorId: string;
  public initiatorName: string;
  public email: string;
  public text: NotifyMessage;
  public dateNotify: Date;

}
