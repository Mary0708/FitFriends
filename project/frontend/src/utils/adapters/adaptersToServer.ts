import { UserEdit, CreateUser } from '../../types/user';
import { QuestionnaireCoach, QuestionnaireUser } from '../../types/questionnaire';
import { CreateUserDto } from '../../dto/user/create-user.dto';
import { EditUserDto } from '../../dto/user/edit-user.dto';

export const adaptCoachToServer =
  (user: CreateUser & QuestionnaireCoach): CreateUserDto => ({
    name: user.name,
    email: user.email,
    password: user.password,
    gender: user.gender,
    dateBirth: user.dateBirth.toString(),
    role: user.role,
    location: user.location,
    levelTraining: user.levelTraining,
    trainingType: user.trainingType,
    successCoach: user.successCoach,
    isPersonal: user.isPersonal
  });

export const adaptUserToServer =
  (user: CreateUser & QuestionnaireUser): CreateUserDto => ({
    name: user.name,
    email: user.email,
    password: user.password,
    gender: user.gender,
    dateBirth: user.dateBirth.toString(),
    role: user.role,
    location: user.location,
    levelTraining: user.levelTraining,
    trainingTime: user.trainingTime,
    trainingType: user.trainingType,
    caloriesReset: user.caloriesReset,
    caloriesSpend: user.caloriesSpend,
    isReady: user.isReady
  });

export const adaptUserEditToServer =
  (user: UserEdit): EditUserDto => ({
    name: user.name,
    gender: user.gender,
    location: user.location,
    levelTraining: user.levelTraining,
    trainingTime: user.trainingTime,
    trainingType: user.trainingType,
    caloriesReset: user.caloriesReset,
    caloriesSpend: user.caloriesSpend,
    isReady: user.isReady,
    isPersonal: user.isPersonal,
    description: user.description
  });


export const adaptAvatarToServer =
  (file: File) => {
    const formData = new FormData();
    formData.append('file', file, file.name);
    return formData;
  };
export const adaptCertificateToServer =
  (file: File, certificateId?: string) => {
    const formData = new FormData();
    formData.append('certificate', file, file.name);
    if(certificateId) {
      formData.append('certificateId', certificateId);
    }
    return formData;
  };


export const adaptVideoToServer =
  (file: File) => {
    const formData = new FormData();
    formData.append('video', file, file.name);
    return formData;
  };

export const adaptBackgroundImgToServer =
  (file: string) => {
    const formData = new FormData();
    formData.set('backgroundImg', file);
    return formData;
  };

