export const USER_ID_IS_EMPTY = 'The userId is empty';
export const EMAIL_NOT_VALID = 'The email is not valid';
export const FIRST_NAME_IS_EMPTY = 'The first name is empty';
export const MAX_TRAINING_COUNT = 3;

export const ORDER_TYPE = 'абонемент';
export const ORDER_NOT_FOUND = 'Order not found';
export const TRAINING_NOT_FOUND = 'Training not found';
export const ORDER_IS_DONE = 'По данному заказу все тренировки списаны';


export const enum PasswordLength {
  MinLength = 6,
  MaxLength = 12
}

export const enum DescriptionUser {
  MinLength = 10,
  MaxLength = 140
}

export const enum CaloriesReset {
  MinCount = 1000,
  MaxCount = 5000
}

export const enum CaloriesSpend {
  MinCount = 1000,
  MaxCount = 5000
}
export const enum SuccessCoach {
  MinLength = 10,
  MaxLength = 140
}

export const enum NameTraining {
  MinLength = 1,
  MaxLength = 15
}

export const enum DescriptionTraining {
  MinLength = 10,
  MaxLength = 140
}

export const enum CommentLength {
  MinLength = 100,
  MaxLength = 1024
}

export const enum CommentRating {
  MinRating = 1,
  MaxRating = 5
}
export const enum TrainingCount {
  MinCount = 1,
  MaxCount = 50
}