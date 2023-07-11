import { ApiProperty } from '@nestjs/swagger';
import { TrainingRdo } from 'apps/training/src/app/training/rdo/training.rdo';
import { Expose, Transform } from 'class-transformer';

export class TrainingDiaryRdo {
  @ApiProperty({
    description: 'Diary unique identifier',
    example: 1,
  })
  @Expose()
  public id: number;

  @ApiProperty({
    description: 'Training entity data',
    example: 1,
  })
  @Expose()
  public training: TrainingRdo;

  @ApiProperty({
    description: 'Date of training',
    example: `${new Date().toISOString()}`,
  })
  @Transform(({ value }) => new Date(value).toISOString())
  @Expose()
  public date: string;
}
