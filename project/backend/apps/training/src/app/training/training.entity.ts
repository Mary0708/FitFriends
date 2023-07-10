import { Training, TrainingTimeType, UserLevelType, TrainingStyleType, UserGenderType } from '@fit-friends/shared/app-types';
import { Injectable } from '@nestjs/common';
import { TrainingValidity as TV } from './training.constant';

@Injectable()
export class TrainingEntity implements Training {
  public id: number;
  public title: string;
  public backgroundImage: string;
  public level: UserLevelType;
  public trainingStyle: TrainingStyleType;
  public trainingTime: TrainingTimeType;
  public dateBirth: Date;
  public price: number;
  public caloriesLoss: number;
  public description: string;
  public gender: UserGenderType;
  public video: string;
  public rating: number;
  public coachId: number;
  public isSpecial: boolean;
  public reviewsCount: number;
  public createdAt: Date;
  public updatedAt: Date;

  constructor(trainingEntity: Training) {
    this.fillEntity(trainingEntity);
  }

  public toObject() {
    return { ...this };
  }

  public fillEntity(trainingEntity: Training) {
    this.id = trainingEntity.id;
    this.title = trainingEntity.title;
    this.backgroundImage = trainingEntity.backgroundImage;
    this.level = trainingEntity.level;
    this.trainingStyle = trainingEntity.trainingStyle;
    this.trainingTime = trainingEntity.trainingTime;
    this.price = trainingEntity.price;
    this.caloriesLoss = trainingEntity.caloriesLoss;
    this.description = trainingEntity.description;
    this.gender = trainingEntity.gender;
    this.video = trainingEntity.video;
    this.rating = trainingEntity.rating;
    this.coachId = trainingEntity.coachId;
    this.isSpecial = trainingEntity.isSpecial;
    this.reviewsCount = TV.ReviewsMinQuantity;
    this.createdAt = trainingEntity.createdAt;
    this.updatedAt = trainingEntity.updatedAt;
  }
}
