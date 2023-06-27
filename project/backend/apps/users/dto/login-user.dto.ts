import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, MaxLength } from 'class-validator';
import { ValidityMessage as VM } from '../../../libs/utils/util-types/src';
import { UserValidation as UV } from '../user/user.constant';

export class LoginUserDto {
  @ApiProperty({
    description: 'User unique email address',
    example: 'user@user.ru',
    required: true,
  })
  @IsEmail({}, { message: VM.IsEmailMessage })
  public email: string;

  @ApiProperty({
    description: 'User password',
    example: '123456',
    required: true,
  })
  @MaxLength(UV.PasswordMaxLength, { message: VM.MaxValueMessage })
  public password: string;
}
