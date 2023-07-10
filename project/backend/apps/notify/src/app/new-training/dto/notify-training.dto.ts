import { TrainingForSend } from '@fit-friends/shared/app-types';

export class NotifyTrainingDto {
  public userId: string;
  public email: string;
  public training: TrainingForSend[];
  public dateSend: string;

}
