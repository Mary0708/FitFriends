import { Comment} from '@fit-friends/shared/app-types';

export class CommentEntity implements Comment {
  public _id: string;
  public userId: number;
  public trainingId: number;
  public rating: number;
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
    this.rating = commentTraining.rating;
    this.message = commentTraining.message;
  }
}
