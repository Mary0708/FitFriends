import { LevelTraining, TrainingType, TrainingTime } from './training';

export type QuestionnaireCoach = {
  levelTraining: LevelTraining;
  trainingType: TrainingType[];
  certificate?: string;
  successCoach: string;
  isPersonal: boolean;
}

export type QuestionnaireUser = {
  levelTraining?: LevelTraining;
  trainingType: TrainingType[];
  trainingTime?: TrainingTime;
  caloriesReset: number;
  caloriesSpend: number;
  isReady: boolean;
}


