import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Query, Req, Res, UseGuards } from '@nestjs/common';
import { ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { TrainingService } from './training.service';
import { DataNotifyTraining, RabbitRouting, RequestWithTokenPayload, TokenPayload, TrainingForSend, UserRole } from '@fit-friends/shared/app-types';
import { Roles, fillObject } from '@fit-friends/utils/util-core';
import { RabbitRPC } from '@golevelup/nestjs-rabbitmq';
import { TrainingRdo } from './rdo/training.rdo';
import { CreateTrainingDTO } from './dto/create-training.dto';
import { MongoidValidationPipe } from '@project/shared/shared-pipes';
import { TrainingCatalogQuery } from './query/training-catalog.query.js';
import { TrainingQuery } from './query/training.query.js';
import { EditTrainingDTO } from './dto/edit-training.dto.js';
import { RolesGuard, JwtAuthGuard } from '@fit-friends/utils/util-types';

@ApiTags('training')
@Controller('training')
export class TrainingController {
  constructor(
    private readonly trainingService: TrainingService,
  ) { }

  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Roles(`${UserRole.Coach}`)
  @ApiResponse({
    type: TrainingRdo,
    status: HttpStatus.OK,
    description: 'Create new training'
  })
  @Post('create')
  public async create(@Body() dto: CreateTrainingDTO, coachId: number) {
    const newTraining = await this.trainingService.create(dto, coachId);
    return fillObject(TrainingRdo, newTraining);
  }

  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Roles(`${UserRole.Coach}`)
  @Post('edit/:id')
  @ApiResponse({
    type: TrainingRdo,
    status: HttpStatus.OK,
    description: 'User edit'
  })
  @ApiResponse({
    type: TrainingRdo,
    status: HttpStatus.NOT_FOUND,
    description: 'Training not found'
  })
  public async update(@Param('id', MongoidValidationPipe) id: number, @Body() dto: EditTrainingDTO, coachId: number) {
    const existTraining = await this.trainingService.update(id, dto, coachId);
    return fillObject(TrainingRdo, existTraining);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  @ApiResponse({
    type: TrainingRdo,
    status: HttpStatus.OK,
    description: 'User found'
  })
  @ApiResponse({
    type: TrainingRdo,
    status: HttpStatus.NOT_FOUND,
    description: 'Training not found',
  })
  public async show(@Param('id', MongoidValidationPipe) id: number) {
    const existTraining = await this.trainingService.show(id);
    return fillObject(TrainingRdo, existTraining);
  }

  @Get('show/catalog')
  @ApiResponse({
    type: TrainingRdo,
    status: HttpStatus.OK,
    description: 'Show catalog training'
  })
  public async showCatalog(@Query() query: TrainingCatalogQuery) {
    const existTraining = await this.trainingService.showCatalog(query);
    return fillObject(TrainingRdo, existTraining);
  }

  @Get('show/list')
  @ApiResponse({
    type: TrainingRdo,
    status: HttpStatus.OK,
    description: 'Show list training'
  })
  public async showList(@Body() body, @Query() query: TrainingQuery) {
    const existTraining = await this.trainingService.showList(body.coachId, query);
    return fillObject(TrainingRdo, existTraining);
  }

  @Delete('delete/:id')
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Roles(`${UserRole.Coach}`)
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiParam({ name: "id", required: true, description: 'Training unique identifier' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Resource for deleting a training' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Training not found', })
  async destroy(@Param('id') id: number, @Req() { user }: RequestWithTokenPayload<TokenPayload>) {
    const existTraining = await this.trainingService.deleteTraining(id, user.sub);
    return fillObject(TrainingRdo, existTraining);
  }

  @RabbitRPC({
    exchange: 'fitfriends.training',
    routingKey: RabbitRouting.GeNewtTraining,
    queue: 'fitfriends.training.newtraining',
  })
  public async getNewTraining(dataNotifyTraining: DataNotifyTraining): Promise<TrainingForSend[]> {
    const listTraining = await this.trainingService.getListTrainingAfterDate(dataNotifyTraining.dateNotify, dataNotifyTraining.coaches);
    const listTrainingForSend = listTraining.map((el) => {
      return {
        title: el.title, description: el.description,
        coachId: el.coachId, createDate: el.createdAt
      } as TrainingForSend
    })
    return listTrainingForSend
  }

  @RabbitRPC({
    exchange: 'fitfriends.uploader',
    routingKey: RabbitRouting.TrainingImg,
    queue: 'fitfriends.uploader.posts',
  })
  public async trainingImg({ trainingId, fileId }) {
    const postUpd = await this.trainingService.changeImg(trainingId, fileId)
    return fillObject(TrainingRdo, postUpd);
  }

  @RabbitRPC({
    exchange: 'fitfriends.uploader',
    routingKey: RabbitRouting.TrainingVideo,
    queue: 'fitfriends.uploader.video',
  })
  public async trainingVideo({ trainingId, fileId }) {
    const postUpd = await this.trainingService.changeVideo(trainingId, fileId)
    return fillObject(TrainingRdo, postUpd);
  }

}
