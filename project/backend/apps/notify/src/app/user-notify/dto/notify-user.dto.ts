import { NotifyMessage } from '@fit-friends/shared/app-types';

export class NotifyUserDto {
  public userId: number;
  public initiatorId: number;
  public initiatorName: string;
  public email: string;
  public text: NotifyMessage;
  public dateNotify: Date;

}
