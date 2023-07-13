import { RequestCategoryType } from './request-category.enum.js';
import { RequestStatusType } from './request-status.enum';

export interface TrainingRequest {
  _id?: number;
  initiatorId: number;
  userId: number;
  requestStatus: RequestStatusType;
  category: RequestCategoryType;
  dateUpd?: Date;
}
