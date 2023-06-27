import { Transform } from 'class-transformer';
import { IsEnum, IsIn, IsNumber, IsOptional } from 'class-validator';
import { ValidityMessage as VM } from '../../../libs/utils/util-types/src';
import { transformToMax } from '../../../libs/utils/util-core/src';
import { UserQuery as UQ, UserSort } from '../user/user.constant';

export class UserQuery {
  @Transform(({ value }) => transformToMax(value, UQ.USER_QUERY_MIN, UQ.USER_QUERY_MAX))
  @IsNumber({ allowInfinity: false, allowNaN: false })
  @IsOptional()
  public limit?: number;

  @Transform(({ value }) => +value)
  @IsNumber({ allowInfinity: false, allowNaN: false })
  @IsOptional()
  public page?: number = UQ.USER_DEFAULT_PAGE;

  @IsEnum(UserSort, { message: `${VM.IsEnumMessage} ${Object.values(UserSort).join(', ')}` })
  @IsOptional()
  public sortType?: UserSort = UserSort.Date;

  @IsIn(['asc', 'desc'])
  @IsOptional()
  public sortDirection?: 'desc' | 'asc' = UQ.USER_DEFAULT_SORT_DIRECTION;
}
