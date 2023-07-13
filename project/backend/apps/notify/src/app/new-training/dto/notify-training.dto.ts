import { TrainingForSend } from '@fit-friends/shared/app-types';

export class NotifyTrainingDto {
  public userId: number;
  public email: string;
  public training: TrainingForSend[];
  public dateSend: string;

}
