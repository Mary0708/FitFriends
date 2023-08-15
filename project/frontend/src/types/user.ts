import { Location } from './location';
import { LevelTraining, TrainingType, TrainingTime } from './training';

export type UserData = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  token: string;
}

export type CreateUser = {
  name: string;
  email: string;
  avatar?: string;
  gender: Gender;
  dateBirth: string;
  role: UserRole;
  description: string;
  location: Location;
  password: string;
}

export type FileType = {
  avatarImg?: File;
  certificateId?: string;
  fileVideoTraining?: File;
  fileCertificate?: File;
}

export type CertificateType = {
 certificateId: string;
 certificatePath: string;
}

export enum Gender {
  Male = 'Мужской',
  Female = 'Женский',
  None = 'Неважно',
}

export const USER_GENDER_ARR = [Gender.Male, Gender.Female, Gender.None];

export enum UserRole {
  Coach = 'coach',
  User = 'user',
}
export enum UserRoleTxt {
  Coach = 'Я хочу тренировать',
  User = 'Я хочу тренироваться',
}
export const USER_ROLE_ARR = [UserRoleTxt.Coach, UserRoleTxt.User];
export const USER_ROLE_ARR_TYPE = [UserRole.Coach, UserRole.User];

export type User = {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  avatarPath?: string;
  gender: Gender;
  dateBirth: string;
  role: UserRole;
  description: string;
  location: Location;
  levelTraining: LevelTraining;
  trainingType: TrainingType[];
  certificate: string[];
  certificatesPath: CertificateType[];
  successCoach: string;
  isPersonal: boolean;
  trainingTime: TrainingTime;
  caloriesReset: number;
  caloriesSpend: number;
  isReady: boolean;
  isFriend?: boolean;
  isSubscribe?: boolean;
}

export type UserEdit = {
  name?: string;
  gender?: Gender;
  description?: string;
  location?: Location;
  levelTraining?: LevelTraining;
  trainingType?: TrainingType[];
  certificate?: string;
  successCoach?: string;
  isPersonal?: boolean;
  trainingTime?: TrainingTime;
  caloriesReset?: number;
  caloriesSpend?: number;
  isReady?: boolean;
}

export type Friend = {
  id: string;
  userId: string;
  name: string;
  avatar: string;
  avatarPath: string;
  email: string;
  gender: Gender;
  dateBirth: string;
  role: UserRole;
  description: string;
  location: Location;
  requestPersonal: boolean;
  requestTogether: boolean;
  requestStatus: StatusRequest;
  requestId?: string;
  trainingType: TrainingType[];
  isReady: boolean;
};

export enum StatusRequest
 {
  Pending = 'Pending',
  Rejected = 'Rejected',
  Accepted = 'Accepted',
}
