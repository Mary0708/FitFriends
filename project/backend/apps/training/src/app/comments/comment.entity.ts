import { Comment} from '@fit-friends/shared/app-types';

export class CommentEntity implements Comment {
  public _id: string;
  public userId: string;
  public trainingId: number;
  public ratingTraining: number;
  public message: string;

 constructor(commentTraining: Comment) {
    this.fillEntity(commentTraining);
  }

  public toObject() {
    return {...this};
  }

  public fillEntity(commentTraining: Comment) {
    this._id = commentTraining._id;
    this.userId = commentTraining.userId;
    this.trainingId = commentTraining.trainingId;
    this.ratingTraining = commentTraining.ratingTraining;
    this.message = commentTraining.message;
  }
}
