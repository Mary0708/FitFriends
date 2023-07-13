import { TrainingRequest, RequestStatus, RequestCategoryType, RequestStatusType } from "@fit-friends/shared/app-types";

export class TrainingRequestEntity implements TrainingRequest {
  public _id: number;
  public initiatorId: number;
  public userId: number;
  public requestStatus: RequestStatusType;
  public category: RequestCategoryType;
  public dateUpd: Date;

  constructor(item: TrainingRequest) {
    this.fillEntity(item);
  }

  public toObject() {
    return {...this};
  }

  public fillEntity(item: TrainingRequest) {
    this._id = item._id;
    this.userId = item.userId;
    this.initiatorId = item.initiatorId;
    this.requestStatus = item.requestStatus;
    this.category = item.category;
    this.dateUpd = item.dateUpd;
  }

}
