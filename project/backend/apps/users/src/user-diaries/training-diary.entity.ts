import { TrainingDiary } from '@fit-friends/shared/app-types';
import { Entity } from '@fit-friends/utils/util-core';
import { Injectable } from '@nestjs/common'

@Injectable()
export class TrainingDiaryEntity implements Entity<TrainingDiaryEntity, TrainingDiary>, TrainingDiary {
  public id?: number;
  public userId: number;
  public trainingId: number;
  public date?: Date;

  constructor(diary: TrainingDiary) {
    this.fillEntity(diary);
  }

  public toObject() {
    return { ...this };
  }

  public fillEntity(diary: TrainingDiary) {
    this.id = diary.id;
    this.userId = diary.userId;
    this.trainingId = diary.trainingId;
    this.date = new Date();
  }
}
