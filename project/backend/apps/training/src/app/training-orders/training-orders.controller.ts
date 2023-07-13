import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Query} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { fillObject } from '@fit-friends/utils/util-core';
import { MongoidValidationPipe } from '@fit-friends/shared/shared-pipes';
import { TrainingOrderRdo } from './rdo/training-order.rdo';
import { TrainingOrdersService } from './training-orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { TrainingOrdersQuery } from './query/training-orders.query';

@ApiTags('training-orders')
@Controller('orders')
export class TrainingOrdersController {
  constructor(
    private readonly orderService: TrainingOrdersService
  ) {}

  @ApiResponse({
    type: TrainingOrderRdo,
    status: HttpStatus.OK,
    description: 'Create new order'
  })
  @Post('create')
  public async create(@Body() dto: CreateOrderDto, userId) {
    const newOrder = await this.orderService.create(dto, userId);
    return fillObject(TrainingOrderRdo, newOrder);
  }

  @ApiResponse({
    type: TrainingOrderRdo,
    status: HttpStatus.OK,
    description: 'Write off a workout from an order'
  })
  @Post('reduce/:id')
  public async reduceOrder(@Param('id', MongoidValidationPipe) id: number) {
    const newOrder = await this.orderService.update(id);
    return fillObject(TrainingOrderRdo, newOrder);
  }

  @ApiResponse({
    type: TrainingOrderRdo,
    status: HttpStatus.OK,
    description: 'Delete order'
  })
  @Delete('delete/:id')
  public async delete(@Param('id', MongoidValidationPipe) id: number) {
   return await this.orderService.delete(id);
  }


  @ApiResponse({
    type: TrainingOrderRdo,
    status: HttpStatus.OK,
    description: 'Show list orders for coach'
  })
  @Get('show/list')
  public async showList(@Body() body, @Query() query: TrainingOrdersQuery) {
    const existOrder = await this.orderService.showList(body.coachId, query);
    return fillObject(TrainingOrderRdo, existOrder);
  }

  @ApiResponse({
    type: TrainingOrderRdo,
    status: HttpStatus.OK,
    description: 'Show list orders for user'
  })
  @Get('show/list/user')
  public async showListUser(@Body() body, @Query() query: TrainingOrdersQuery) {
    const existOrder = await this.orderService.showListByUser(body.userId, query);
    return fillObject(TrainingOrderRdo, existOrder);
  }


  @ApiResponse({
    type: TrainingOrderRdo,
    status: HttpStatus.OK,
    description: 'Show order'
  })
  @Get(':id')
  public async show(@Param('id', MongoidValidationPipe) id: number) {
    const existOrder = await this.orderService.show(id);
    return fillObject(TrainingOrderRdo, existOrder);
  }

}
