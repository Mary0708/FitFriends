import { EMAIL_NOT_VALID, FIRST_NAME_IS_EMPTY } from '@fit-friends/utils/util-types';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateSubscriberDto {
  @IsEmail({}, { message: EMAIL_NOT_VALID })
  public email: string;

  @IsNotEmpty({ message: FIRST_NAME_IS_EMPTY })
  public name: string;

}
