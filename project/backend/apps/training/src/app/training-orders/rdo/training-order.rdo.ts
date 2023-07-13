import { OrderCategory, OrderCategoryType, TrainingStyleType, TrainingTimeType } from '@fit-friends/shared/app-types';
import { ApiProperty } from '@nestjs/swagger';
import { Expose, Transform } from 'class-transformer';

export class TrainingOrderRdo {
  @ApiProperty({
    description: 'The uniq user ID',
  })
  @Expose({ name: '_id'})
  @Transform((value) => value.obj['_id'])
  public id: number;

  @ApiProperty({
    description: 'Training name',
  })
  @Expose()
  public title: string;

  @ApiProperty({
    description: 'The level of physical fitness of the user'
  })
  @Expose()
  public level: string;

  @ApiProperty({
    description: 'The level of physical fitness of the user'
  })
  @Expose()
  public trainingStyle: TrainingStyleType;

  @ApiProperty({
    description: 'Time for training'
  })
  @Expose()
  public trainingTime: TrainingTimeType;

  @ApiProperty({
    description: 'The cost of training'
  })
  @Expose()
  public price: number;

  @ApiProperty({
    description: 'Number of calories to reset'
  })
  @Expose()
  public caloriesLoss: number;

  @ApiProperty({
    description: 'Training description'
  })
  @Expose()
  public description: string;

  @ApiProperty({
    description: 'User gender'
  })
  @Expose()
  public gender: string;

  @ApiProperty({
    description: 'Coach Id'
  })
  @Expose()
  public coachId: number;

  @ApiProperty({
    description: 'The sign of a special offer'
  })
  @Expose()
  public isSpecial: boolean;

  @ApiProperty({
    description: 'Training count'
  })
  @Expose()
  public trainingCount: number;

  @ApiProperty({
    description: 'Total price'
  })
  @Expose()
  public totalPrice: number;

  @ApiProperty({
    description: 'User Id'
  })
  @Expose()
  public userId: number;

  @ApiProperty({
    description: "Order category",
    example: OrderCategory.Training,
  })
  @Expose()
  public category: OrderCategoryType;

  @ApiProperty({
    description: 'Error'
  })
  @Expose()
  public error: string;
}
