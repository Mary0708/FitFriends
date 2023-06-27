
export type UserFeatures = {
  trainingTime: string; //поменять
  caloriesLoss: number;
  caloriesLossPerDay: number;
  isReadyForTraining: boolean;
}

export type CoachFeatures = {
  certificate: string;
  merits: string;
  isPersonalCoach: boolean;
}

export type Features = UserFeatures | CoachFeatures;
