import { IsNumber, IsOptional, IsArray, IsInt, Min, Max, IsIn } from 'class-validator';
import { Transform } from 'class-transformer';
import { TrainingStyle } from '@fit-friends/shared/app-types';
import { DEFAULT_LIST_COUNT_LIMIT, RatingQuery } from '@fit-friends/utils/util-types';

export class TrainingCatalogQuery {
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
  public trainingStyle?: TrainingStyle[];

  @IsIn(['asc', 'desc', 1, -1])
  @Transform(({ value } ) => value === 'desc' || value==='-1' ? -1 : 1 )
  @IsOptional()
  public sortPrice?: 'desc' | 'asc' | '1' | '-1';

  @Transform(({ value }) => +value)
  @IsOptional()
  public page?: number;
}
