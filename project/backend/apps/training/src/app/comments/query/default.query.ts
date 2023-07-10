import { IsNumber, IsOptional} from 'class-validator';
import { Transform } from 'class-transformer';
import { DEFAULT_LIST_COUNT_LIMIT } from '@fit-friends/utils/util-types';

export class DefaultQuery {
  @Transform(({ value } ) => +value || DEFAULT_LIST_COUNT_LIMIT)
  @IsNumber()
  public limit = DEFAULT_LIST_COUNT_LIMIT;

  @Transform(({ value }) => +value)
  @IsOptional()
  public page?: number;
}
