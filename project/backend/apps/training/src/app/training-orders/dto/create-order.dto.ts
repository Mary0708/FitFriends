import { ApiProperty } from '@nestjs/swagger';
import { OrderCategory, OrderCategoryType, PaymentOption } from '@fit-friends/shared/app-types';
import { IsEnum, IsInt, Max, Min } from 'class-validator';
import { TrainingCount, ValidityMessage as VM } from '@fit-friends/utils/util-types';

export class CreateOrderDto {
  @ApiProperty({
    description: 'User Id'
  })
  public userId: string;

  @ApiProperty({
    description: 'Training Id'
  })
  public trainingId: number;

  @ApiProperty({
    description: 'Training count'
  })
  @IsInt()
  @Min(TrainingCount.MinCount)
  @Max(TrainingCount.MaxCount)
  public trainingCount: number;

  @ApiProperty({
    description: 'Payment method',
    enum: PaymentOption, enumName: 'PaymentOption'})
  public paymentOption: PaymentOption;

  @ApiProperty({
    description: "Order category",
    example: OrderCategory.Training,
    type: () => OrderCategory,
    enum: OrderCategory,
    required: true,
  })
  @IsEnum(OrderCategory, { message: `${VM.IsEnumMessage} ${Object.values(OrderCategory).join(', ')}` })
  public category: OrderCategoryType;
}
