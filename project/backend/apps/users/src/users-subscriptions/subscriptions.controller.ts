import { Body, Controller, Delete, Get, HttpStatus, Param, Post } from '@nestjs/common';
import { fillObject } from '@fit-friends/utils/util-core';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { SubscriptionsService } from './users-subscriptions.service';
import { SubscriptionRdo } from './rdo/subscription.rdo';
import { UserSubscriptionDto } from '../dto/user-subscription.dto';

@ApiTags('subscription')
@Controller('subscription')
export class SubscriptionsController {
  constructor(
    private readonly subscriptionsService: SubscriptionsService,
  ) {}

  @ApiResponse({
    type: SubscriptionRdo,
    status: HttpStatus.CREATED,
    description: 'The new subscription has been successfully created.'
  })
  @Post('create')
  public async create(@Body() dto: UserSubscriptionDto) {
    const newSubscription = await this.subscriptionsService.create(dto);
    return newSubscription;
  }

  @ApiResponse({
    type: SubscriptionRdo,
    status: HttpStatus.OK,
    description: 'Delete subscription'
  })
  @Delete('delete')
  public async delete(@Body() dto: UserSubscriptionDto) {
    const delSubscription = await this.subscriptionsService.delete(dto);
    return delSubscription
  }

  @ApiResponse({
    type: SubscriptionRdo,
    status: HttpStatus.OK,
    description: 'Subscription by userId found'
  })
  @Get('user/:userId')
  public async getByUserId(@Param('userId') userId: number) {
    const subscriptions = await this.subscriptionsService.getByUserId(userId);
    return fillObject(SubscriptionRdo, subscriptions);
  }

  @ApiResponse({
    type: SubscriptionRdo,
    status: HttpStatus.OK,
    description: 'Subscription by userId found'
  })
  @Get('usersubscription/:coachId')
  public async getByUserSubscriptionId(@Param('coachId') coachId: number) {
    const subscriptions = await this.subscriptionsService.getByCoachId(coachId);
    return fillObject(SubscriptionRdo, subscriptions);
  }

}

