import { IsNumber, IsOptional, IsArray, IsInt, Min, Max } from 'class-validator';
import { Transform } from 'class-transformer';
import { TrainingTimeType } from '@fit-friends/shared/app-types';
import { DEFAULT_LIST_COUNT_LIMIT, RatingQuery } from '@fit-friends/utils/util-types';

export class TrainingQuery {
  @Transform(({ value } ) => +value || DEFAULT_LIST_COUNT_LIMIT)
  @IsNumber()
  public limit = DEFAULT_LIST_COUNT_LIMIT;

  @Transform(({ value }) => {if (typeof value === "string") {return value.split(',').map((el: string) => el)} return value })
  @IsArray({})
  @IsOptional()
  public price?: string;

  @Transform(({ value }) => {if (typeof value === "string") {return value.split(',').map((el: string) => el)} return value })
  @IsArray({})
  @IsOptional()
  public caloriesLoss?: string;

  @IsInt({})
  @Min(RatingQuery.MinCount)
  @Max(RatingQuery.MaxCount)
  @IsOptional()
  public rating?: number;

  @Transform(({ value }) => {if (typeof value === "string") {return value.split(',').map((el: string) => el)} return value })
  @IsArray({})
  @IsOptional()
  public trainingTime?: TrainingTimeType[];

  @Transform(({ value }) => +value)
  @IsOptional()
  public page?: number;
}
