import { TrainingForSend } from "./training-for-send.interface";

export interface NotifyTraining {
  id?: number;
  training: TrainingForSend[];
  userId: number;
  email: string;
  dateSend: string
}
