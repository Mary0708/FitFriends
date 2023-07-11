import { ApiProperty } from "@nestjs/swagger";
import { RequestStatus, RequestStatusType, RequestCategoryType, RequestCategory } from "@fit-friends/shared/app-types";

export class CreateRequestDto {

  @ApiProperty({
    description: 'Initiator Id'
  })
  public initiatorId: string;

  @ApiProperty({
    description: 'User Id'
  })
  public userId: string;

  @ApiProperty({
    description: 'Type request',
    enum: RequestCategory, enumName: 'RequestCategory'})
  public category: RequestCategoryType;

  @ApiProperty({
    description: 'Request status',
    enum: RequestStatus, enumName: 'RequestStatus'})
  public requestStatus: RequestStatusType;
}
