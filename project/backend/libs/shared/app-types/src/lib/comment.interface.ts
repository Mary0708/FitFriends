export interface Comment {
  _id?: string;
  userId: number;
  trainingId: number;
  ratingTraining: number;
  message: string;
}
