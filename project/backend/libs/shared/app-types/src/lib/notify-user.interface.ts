import { NotifyMessage } from "./notify-message.enum";

export interface NotifyUser {
  id?: number;
  userId: number;
  initiatorId?: number;
  initiatorName?: string;
  text: NotifyMessage;
  dateNotify: Date;
}
