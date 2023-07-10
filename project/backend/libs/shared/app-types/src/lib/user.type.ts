import { UserLevelType } from './user-level.enum';
import { LocationType } from './location.enum';
import { UserRoleType } from './user-role.enum';
import { UserGenderType } from './user-gender.enum';
import { TrainingStyleType } from './training-style.enum';
import { Features } from './user-features.type';

export type User = {
  id?: number;
  name: string;
  email: string;
  avatar: string;
  password: string;
  gender: UserGenderType;
  dateBirth: Date;
  role: UserRoleType;
  location: LocationType;
  level: UserLevelType;
  trainingStyle: TrainingStyleType;
  features: Features;
  createdAt?: Date;
  updatedAt?: Date;
}
