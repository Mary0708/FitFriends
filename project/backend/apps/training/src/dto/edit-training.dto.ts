import { UserLevel, TrainingTime, TrainingStyle, UserGender, TrainingTimeType } from '@fit-friends/shared/app-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional, Max, MaxLength, Min, MinLength } from 'class-validator';
import { NameTraining, CaloriesLoss, description } from '../app/training/training.constant';

export class EditTrainingDTO  {

  @ApiProperty({
    description: 'Training name'
  })
  @MinLength(NameTraining.MinLength)
  @MaxLength(NameTraining.MaxLength)
  @IsOptional()
  public title?: string;

  @ApiProperty({
    description: 'The level of physical fitness of the user',
    enum: UserLevel, enumName: 'UserLevel'
  })
  @IsOptional()
  public level?: UserLevel;

  @ApiProperty({
    description: 'The level of physical fitness of the user',
    enum: TrainingStyle, enumName: 'TrainingStyle'
  })
  @IsOptional()
  public trainingStyle?: TrainingStyle;

  @ApiProperty({
    description: 'Time for training',
    enum: TrainingTime, enumName: 'TrainingTime'
  })
  @IsOptional()
  public trainingTime?: TrainingTimeType;

  @ApiProperty({
    description: 'The cost of training'
  })
  @IsInt()
  @IsOptional()
  public price?: number;

  @ApiProperty({
    description: 'Number of calories to reset'
  })
  @IsInt()
  @Min(CaloriesLoss.MinCount)
  @Max(CaloriesLoss.MaxCount)
  @IsOptional()
  public caloriesLoss?: number;

  @ApiProperty({
    description: 'Training description'
  })
  @MinLength(description.MinLength)
  @MaxLength(description.MaxLength)
  @IsOptional()
  public description?: string;

  @ApiProperty({
    description: 'User gender',
    enum: UserGender, enumName: 'UserGender'})
    @IsOptional()
  public gender?: UserGender;

  @ApiProperty({
    description: 'The sign of a special offer'
  })
  @IsOptional()
  public isSpecial?: boolean;
}

