import { TrainingStyle, TrainingStyleType, TrainingTime, TrainingTimeType } from '@fit-friends/shared/app-types';
import { ApiProperty } from '@nestjs/swagger';
import { Expose, Transform } from 'class-transformer';

export class TrainingRdo {
  @ApiProperty({
    description: 'The uniq user ID',
  })
  @Expose({ name: '_id' })
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
    description: 'The level of physical fitness of the user',
    example: TrainingStyle.Aerobics
  })
  @Expose()
  public trainingStyle: TrainingStyleType;

  @ApiProperty({
    description: 'Time for training',
    example: TrainingTime.Time100
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
    description: 'Rating'
  })
  @Expose()
  public rating: number;

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
    description: 'Error'
  })
  @Expose()
  public error: string;
}
