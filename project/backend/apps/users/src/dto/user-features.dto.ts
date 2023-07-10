import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, Max, MaxLength, Min, MinLength } from 'class-validator';
import { TrainingTime, TrainingTimeType } from '@fit-friends/shared/app-types';
import { ValidityMessage as VM } from '@fit-friends/utils/util-types';
import { IsBooleanProp } from '@fit-friends/utils/util-core';
import { UserValidation as UV } from '../user/user.constant';

export abstract class FeaturesDto { }

export class UserFeaturesDto extends FeaturesDto {
  @ApiProperty({
    description: 'Desired training time',
    example: TrainingTime.Time30,
    type: () => String,
    enum: TrainingTime,
    required: true,
  })
  @IsEnum(TrainingTime, { message: `${VM.IsEnumMessage} ${Object.values(TrainingTime).join(', ')}` })
  trainingTime: TrainingTimeType;

  @ApiProperty({
    description: 'Number of calories to lose',
    example: UV.CaloriesLossMinValue,
    minimum: UV.CaloriesLossMinValue,
    maximum: UV.CaloriesLossMaxValue,
    required: true,
  })
  @Min(UV.CaloriesLossMinValue, { message: VM.MinValueMessage })
  @Max(UV.CaloriesLossMaxValue, { message: VM.MaxValueMessage })
  caloriesLoss: number;

  @ApiProperty({
    description: 'Number of calories to lose per day',
    example: UV.CaloriesLossPerDayMinValue,
    minimum: UV.CaloriesLossPerDayMinValue,
    maximum: UV.CaloriesLossPerDayMaxValue,
    required: true,
  })
  @Min(UV.CaloriesLossMinValue, { message: VM.MinValueMessage })
  @Max(UV.CaloriesLossMaxValue, { message: VM.MaxValueMessage })
  caloriesLossPerDay: number;

  @ApiProperty({
    description: "Flag of the user's readiness for training invitations",
    example: true,
    required: true,
  })
  @IsBooleanProp({ message: VM.IsBoolean })
  isReadyForTraining: boolean;
}

export class CoachFeaturesDto extends FeaturesDto {
  @ApiProperty({
    description: 'Text describing the merits of the coach',
    example: 'Master of sports in boxing',
    minLength: UV.MeritsMinLength,
    maxLength: UV.MeritsMaxLength,
    required: true,
  })
  @MinLength(UV.MeritsMinLength, { message: VM.MinValueMessage })
  @MaxLength(UV.MeritsMaxLength, { message: VM.MaxValueMessage })
  merits: string;

  @ApiProperty({
    description: 'Flag of readiness to conduct individual training',
    example: true,
    required: true,
  })
  @IsBooleanProp({ message: VM.IsBoolean })
  isPersonalCoach: boolean;
}

