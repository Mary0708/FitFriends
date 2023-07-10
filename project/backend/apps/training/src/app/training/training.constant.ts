export const TRAINING_NOT_FOUND = 'Training not found';

export const enum CaloriesLoss {
  MinCount = 1000,
  MaxCount = 5000
}

export const enum NameTraining {
  MinLength = 1,
  MaxLength = 15
}

export const enum DescriptionTraining {
  MinLength = 10,
  MaxLength = 140
}

export enum TrainingValidity {
  TitleMinLength = 1,
  TitleMaxLength = 15,
  PriceMinValue = 0,
  PriceMaxValue = 1000000,
  CaloriesLossMinValue = 1000,
  CaloriesLossMaxValue = 5000,
  DescriptionMinLength = 10,
  DescriptionMaxLength = 140,
  RatingMinValue = 1,
  RatingMaxValue = 5,
  ReviewsMinQuantity = 0,
}

export const enum TrainingCount {
  MinCount = 1,
  MaxCount = 50
}