import { ValidityMessage as VM } from '@fit-friends/utils/util-types';
import { RequestStatus, RequestStatusType } from '@fit-friends/shared/app-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotIn } from 'class-validator';

export class UpdateRequestDto {
  @ApiProperty({
    description: "Request status",
    example: RequestStatus.Accepted,
    enum: RequestStatus,
    required: true,
  })
  @IsNotIn([RequestStatus.Pending])
  @IsEnum(RequestStatus, { message: `${VM.IsEnumMessage} ${Object.values(RequestStatus).join(', ')}` })
  public status: RequestStatusType;
}
