import { Location } from './location';
import { UserRole, Gender } from './user';

export type Training = {
  id: string;
  title?: string;
  photo?: string;
  levelTraining?: LevelTraining;
  trainingType?: TrainingType;
  trainingTime?: TrainingTime;
  price?: number;
  caloriesReset?: number;
  description?: string;
  gender?: Gender;
  video?: string;
  videoPath?: string;
  fileVideoTraining?: File;
  rating?: number;
  coachId?: string;
  coachName?: string;
  coachAvatarPath?: string;
  isSpecial?: boolean;
  createdAt?: Date;
}

export type NewTraining = {
  title: string;
  photo?: string;
  levelTraining: LevelTraining;
  trainingType: TrainingType;
  trainingTime: TrainingTime;
  price: number;
  caloriesReset: number;
  description: string;
  gender: Gender;
  video?: string;
  videoPath?: string;
  rating?: number;
  isSpecial?: boolean;
}

export type TotalTrainInfo = {
  totalTrainings: number;
  maxPrice: number;
}

export type Query = {
  limit?: number;
  price?: number[];
  caloriesReset?: number[];
  rating?: number[];
  trainingTime?: TrainingTime[];
  trainingType?: TrainingType[];
  page?: number;
  sortDate?: string;
  sortCount?: string;
  sortPrice?: string;
  userRole?: UserRole;
  location?: Location[];
  levelTraining?: LevelTraining;
  isDone?: string;
}

export enum StatusRequest {
  Pending = 'на рассмотрении',
  Rejected = 'отклонён',
  Accepted = 'принят',
}

export enum TypeRequest {
  Personal = 'персональная тренировка',
  Together = 'совместная тренировка'
}

export type TrainingRequest = {
  userId: string;
  statusRequest: StatusRequest;
  typeRequest: TypeRequest;
}

export enum TrainingTime {
  Time30 = '10-30 мин',
  Time50 = '30-50 мин',
  Time80 = '50-80 мин',
  Time100 = '80-100 мин'
}
export const TRAINING_TIME = Object.values(TrainingTime);

export enum TrainingType {
  Yoga = 'йога',
  Running = 'бег',
  Boxing = 'бокс',
  Stretching = 'стрейчинг',
  Crossfit = 'кроссфит',
  Aerobics = 'аэробика',
  Pilates = 'пилатес',
}
export const TRAINING_ARR = Object.values(TrainingType);


export enum LevelTraining {
  Beginner = 'новичок',
  Amateur = 'любитель',
  Professional = 'профессионал',
}

export const LEVEL_TRAIN_ARR = Object.values(LevelTraining);
