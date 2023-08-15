import UserWithTokenDto from '../../dto/user/user-with-token.dto';
import { User, UserData } from '../../types/user';

export const adaptLoginToClient =
  (user: UserWithTokenDto): UserData => ({
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    token: user.token,
  });

export const adaptUserToClient =
  (user: User): User => ({
    id: user.id,
    name: user.name,
    email: user.email,
    avatar: user.avatar,
    avatarPath: user.avatarPath,
    gender: user.gender,
    dateBirth: user.dateBirth,
    role: user.role,
    description: user.description,
    location: user.location,
    levelTraining: user.levelTraining,
    trainingType: user.trainingType,
    certificate: user.certificate,
    certificatesPath: user.certificatesPath,
    successCoach: user.successCoach,
    isPersonal: user.isPersonal,
    trainingTime: user.trainingTime,
    caloriesReset: user.caloriesReset,
    caloriesSpend: user.caloriesSpend,
    isReady: user.isReady,
    isFriend: user.isFriend,
    isSubscribe: user.isSubscribe
  });

