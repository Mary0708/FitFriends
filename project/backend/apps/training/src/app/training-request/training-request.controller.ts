import { Body, Controller, Delete, HttpCode, HttpStatus, Param, Post, UseGuards } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Roles, fillObject } from '@fit-friends/utils/util-core';
import { TrainingRequestService } from './training-request.service';
import { TrainingRequestRdo } from './rdo/training-request.rdo';
import { MongoidValidationPipe } from '@fit-friends/shared/shared-pipes';
import { NotifyUserService } from '../notify-user/notify-user.service';
import { CreateRequestDto } from './dto/create-request.dto';
import { UserRole } from '@fit-friends/shared/app-types';
import { RolesGuard, JwtAuthGuard } from '@fit-friends/utils/util-types';

@ApiTags('training-request')
@Controller('request')
export class TrainingRequestController {
  constructor(
    private readonly requestService: TrainingRequestService,
    private readonly notifyUserService: NotifyUserService
  ) { }

  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Roles(`${UserRole.User}`)
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Create request'
  })
  @Post('create')
  public async create(@Body() dto: CreateRequestDto, initiatorId: number) {
    const newTrainingRequests = await this.requestService.create(dto, initiatorId);
    await this.notifyUserService.trainingNotifyUser(newTrainingRequests)
    return fillObject(TrainingRequestRdo, newTrainingRequests);
  }

  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({
    type: TrainingRequestRdo,
    status: HttpStatus.OK,
    description: 'Update status'
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Request not found'
  })
  @Post('update/:id')
  public async updateStatus(@Param('id', MongoidValidationPipe) id: number, @Body() body) {
    const updRequest = await this.requestService.updateStatus(id, body.requestStatus);
    return fillObject(TrainingRequestRdo, updRequest);
  }

  @ApiResponse({
    type: TrainingRequestRdo,
    status: HttpStatus.OK,
    description: 'Delete request'
  })
  @Delete('delete/:id')
  public async delete(@Param('id', MongoidValidationPipe) id: number) {
    return await this.requestService.delete(id);
  }
}
