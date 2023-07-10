import { RequestCategoryType } from './request-category.enum.js';
import { RequestStatusType } from './request-status.enum';

export interface TrainingRequest {
  _id?: number;
  initiatorId: string;
  userId: string;
  requestStatus: RequestStatusType;
  category: RequestCategoryType;
  dateUpd?: Date;
}
