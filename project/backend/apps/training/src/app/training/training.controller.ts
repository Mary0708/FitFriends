import { Body, Controller, Get, HttpStatus, Param, Post, Query} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { TrainingService } from './training.service';
import { DataNotifyTraining, RabbitRouting, TrainingForSend } from '@fit-friends/shared/app-types';
import { fillObject } from '@fit-friends/utils/util-core';
import { RabbitRPC } from '@golevelup/nestjs-rabbitmq';
import { TrainingRdo } from './rdo/training.rdo';
import { CreateTrainingDTO } from './dto/create-training.dto';
import { MongoidValidationPipe } from '@project/shared/shared-pipes';
import { TrainingCatalogQuery } from './query/training-catalog.query.js';
import { TrainingQuery } from './query/training.query.js';
import { EditTrainingDTO } from './dto/edit-training.dto.js';

@ApiTags('training')
@Controller('training')
export class TrainingController {
  constructor(
    private readonly trainingService: TrainingService,
  ) {}

  @ApiResponse({
    type: TrainingRdo,
    status: HttpStatus.OK,
    description: 'Create new training'
  })
  @Post('create')
  public async create(@Body() dto: CreateTrainingDTO) {
    const newTrainig = await this.trainingService.create(dto);
    return fillObject(TrainingRdo, newTrainig);
  }

  @Post('edit/:id')
  @ApiResponse({
    type: TrainingRdo,
    status: HttpStatus.OK,
    description: 'User edit'
  })
  public async update(@Param('id', MongoidValidationPipe) id: number, @Body() dto: EditTrainingDTO) {
    const existTrainig = await this.trainingService.update(id, dto);
      return fillObject(TrainingRdo, existTrainig);

  }

  @Get(':id')
  @ApiResponse({
    type: TrainingRdo,
    status: HttpStatus.OK,
    description: 'User found'
  })
  public async show(@Param('id', MongoidValidationPipe) id: number) {
    const existTrainig = await this.trainingService.show(id);
    return fillObject(TrainingRdo, existTrainig);
  }

  @Get('show/catalog')
  @ApiResponse({
    type: TrainingRdo,
    status: HttpStatus.OK,
    description: 'Show catalog training'
  })
  public async showCatalog(@Query() query: TrainingCatalogQuery) {
    const existTrainig = await this.trainingService.showCatalog(query);
    return fillObject(TrainingRdo, existTrainig);
  }

  @Get('show/list')
  @ApiResponse({
    type: TrainingRdo,
    status: HttpStatus.OK,
    description: 'Show list training'
  })
  public async showList(@Body() body, @Query() query: TrainingQuery) {
    const existTrainig = await this.trainingService.showList(body.coachId, query);
    return fillObject(TrainingRdo, existTrainig);
  }

  @RabbitRPC({
    exchange: 'fitfriends.training',
    routingKey: RabbitRouting.GeNewtTraining,
    queue: 'fitfriends.training.newtraining',
  })
  public async getNewTraining(dataNotifyTraining: DataNotifyTraining) : Promise<TrainingForSend[]> {
    const listTraining = await this.trainingService.getListTraingAfterDate(dataNotifyTraining.dateNotify, dataNotifyTraining.coaches);
    const listTrainingForSend = listTraining.map((el) => {
      return {title: el.title, description: el.description,
              coachId: el.coachId, createDate: el.createdAt} as TrainingForSend
    })
    return listTrainingForSend
  }

  @RabbitRPC({
    exchange: 'fitfriends.uploader',
    routingKey: RabbitRouting.TrainingImg,
    queue: 'fitfriends.uploader.posts',
  })
  public async trainingImg({trainingId, fileId}) {
    const postUpd = await this.trainingService.changeImg(trainingId, fileId)
    return fillObject(TrainingRdo, postUpd);
  }

  @RabbitRPC({
    exchange: 'fitfriends.uploader',
    routingKey: RabbitRouting.TrainingVideo,
    queue: 'fitfriends.uploader.video',
  })
  public async trainingVideo({trainingId, fileId}) {
    const postUpd = await this.trainingService.changeVideo(trainingId, fileId)
    return fillObject(TrainingRdo, postUpd);
  }

  @Post('test')
  public async createTestData(@Body() test_data) {
    const dataArr = [];
    for (const key in test_data) {
      const training = await this.trainingService.createTestData(test_data[key]);
    dataArr.push(training);
  }
    return dataArr;
  }
}
