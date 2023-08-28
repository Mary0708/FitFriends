import { Location } from '../../types/location';
import { LevelTraining, TrainingType, TrainingTime } from '../../types/training';
import { UserRole, Gender } from '../../types/user';

export class CreateUserDto {
  /**User */
  public name!: string;
  public email!: string;
  public password!: string;
  public gender!: Gender;
  public dateBirth!: string;
  public role!: UserRole;
  public description?: string;
  public location!: Location;

  /**Add info for coach and users */
  public levelTraining?: LevelTraining;
  public trainingType?: TrainingType[];

  /**Add info for coach */
  public certificate?: string;
  public successCoach?: string;
  public isPersonal?: boolean;

  /**Add info for users */
  public trainingTime?: TrainingTime;
  public caloriesReset?: number;
  public caloriesSpend?: number;
  public isReady?: boolean;
}
