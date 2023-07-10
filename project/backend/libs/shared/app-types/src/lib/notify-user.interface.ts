import { NotifyMessage } from "./notify-message.enum";

export interface NotifyUser {
  id?: number;
  userId: string;
  initiatorId?: string;
  initiatorName?: string;
  text: NotifyMessage;
  dateNotify: Date;
}
