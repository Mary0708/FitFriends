import { TrainingStyle, TrainingTime, TrainingTimeType, UserGender, UserLevel } from "@fit-friends/shared/app-types";
import { ApiProperty } from "@nestjs/swagger";
import { IsInt, Max, MaxLength, Min, MinLength } from 'class-validator';
import { NameTraining, CaloriesLoss, DescriptionTraining } from "../training.constant.js";

export class CreateTrainingDTO  {

  @ApiProperty({
    description: 'Training name'
  })
  @MinLength(NameTraining.MinLength)
  @MaxLength(NameTraining.MaxLength)
  public title: string;

  @ApiProperty({
    description: 'The level of physical fitness of the user',
    enum: UserLevel, enumName: 'UserLevel'
  })
  public level: UserLevel;

  @ApiProperty({
    description: 'The level of physical fitness of the user',
    enum: TrainingTime, enumName: 'TrainingStyle'
  })
  public trainingStyle: TrainingStyle;

  @ApiProperty({
    description: 'Time for training',
    enum: TrainingTime, enumName: 'TrainingTime'
  })
  public trainingTime: TrainingTimeType;

  @ApiProperty({
    description: 'The cost of training'
  })
  @IsInt()
  public price: number;

  @ApiProperty({
    description: 'Number of calories to reset'
  })
  @IsInt()
  @Min(CaloriesLoss.MinCount)
  @Max(CaloriesLoss.MaxCount)
  public caloriesLoss: number;

  @ApiProperty({
    description: 'Training description'
  })
  @MinLength(DescriptionTraining.MinLength)
  @MaxLength(DescriptionTraining.MaxLength)
  public description: string;

  @ApiProperty({
    description: 'User gender',
    enum: UserGender, enumName: 'UserGender'})
  public gender: UserGender;

  @ApiProperty({
    description: 'Coach Id'
  })
  public coachId: number;

  @ApiProperty({
    description: 'The sign of a special offer'
  })
  public isSpecial: boolean;
}

