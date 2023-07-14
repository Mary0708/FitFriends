import { Body, Controller, Delete, Get, Param, Post, Query, Req, UseFilters, UseGuards, UseInterceptors } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ApplicationServiceURL } from './app.config';
import { Request } from 'express';
import { AxiosExceptionFilter } from './filters/axios-exception.filter';
import { MongoidValidationPipe } from '@fit-friends/shared/shared-pipes';
import { CheckAuthGuard } from './guards/check-auth.guard';
import { UserIdInterceptor } from './interceptors/userid.interceptor';
import { RoleUserInterceptor } from './interceptors/role-user.interceptor';
import { UserIdOrderInterceptor } from './interceptors/userid-order.interceptor';
import { InintiatorIdInterceptor } from './interceptors/initiatorid.interceptor';
import { UserIdExistsInterceptor } from './interceptors/userid-exists.interceptor';
import { UserSubscriptionDto } from '@fit-friends/user/user-dto';
import { CreateOrderDto, CreateRequestDto } from '@fit-friends/training/training-dto';
import { DefaultQuery, TrainingOrdersQuery } from '@fit-friends/training/training-query';

@Controller('user')
@UseFilters(AxiosExceptionFilter)
export class UserAccountController {
  constructor(
    private readonly httpService: HttpService
  ) { }

  @UseGuards(CheckAuthGuard)
  @UseInterceptors(RoleUserInterceptor)
  @UseInterceptors(UserIdInterceptor)
  @Post('friends/add/:friendId')
  public async addFriend(@Req() req: Request, @Param('friendId', MongoidValidationPipe) friendId: string) {
    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Friends}/add/${friendId}`, null, {
      headers: {
        'Authorization': req.headers['authorization']
      }
    });
    return data;
  }

  @UseGuards(CheckAuthGuard)
  @UseInterceptors(RoleUserInterceptor)
  @UseInterceptors(UserIdInterceptor)
  @Post('friends/delete/:friendId')
  public async deleteFriend(@Req() req: Request, @Param('friendId', MongoidValidationPipe) friendId: string) {
    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Friends}/delete/${friendId}`, null, {
      headers: {
        'Authorization': req.headers['authorization']
      }
    });
    return data;
  }

  @UseGuards(CheckAuthGuard)
  @UseInterceptors(UserIdInterceptor)
  @Get('friends/show')
  public async showFriends(@Req() req: Request, @Query() query: DefaultQuery) {
    const { data } = await this.httpService.axiosRef.get(`${ApplicationServiceURL.Friends}/user`, {
      params: query,
      headers: {
        'Authorization': req.headers['authorization']
      }
    });
    return data;
  }

  @UseGuards(CheckAuthGuard)
  @UseInterceptors(RoleUserInterceptor)
  @UseInterceptors(UserIdInterceptor)
  @Post('orders/create')
  public async createOrder(@Body() dto: CreateOrderDto) {
    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Orders}/create`, dto);
    return data;
  }

  @UseGuards(CheckAuthGuard)
  @UseInterceptors(RoleUserInterceptor)
  @UseInterceptors(UserIdInterceptor)
  @UseInterceptors(UserIdOrderInterceptor)
  @Post('orders/reduce/:id')
  public async reduceOrder(@Param('id', MongoidValidationPipe) id: string) {
    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Orders}/reduce/${id}`, null);
    return data;
  }

  @UseGuards(CheckAuthGuard)
  @UseInterceptors(RoleUserInterceptor)
  @UseInterceptors(UserIdInterceptor)
  @Get('orders')
  public async showOrders(@Body() userId: number, @Query() query: TrainingOrdersQuery) {
    const { data } = await this.httpService.axiosRef.get(`${ApplicationServiceURL.Orders}/show/list/user`, { params: query, data: userId });
    return data;
  }

  @UseGuards(CheckAuthGuard)
  @UseInterceptors(RoleUserInterceptor)
  @UseInterceptors(UserIdInterceptor)
  @UseInterceptors(UserIdOrderInterceptor)
  @Delete('orders/delete/:id')
  public async deleteOrder(@Param('id', MongoidValidationPipe) id: string) {
    const { data } = await this.httpService.axiosRef.delete(`${ApplicationServiceURL.Orders}/delete/${id}`);
    return data;
  }

  @UseGuards(CheckAuthGuard)
  @UseInterceptors(UserIdInterceptor)
  @Post('subscription/create')
  public async createSubscription(@Body() dto: UserSubscriptionDto) {

    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Subscription}/create`, dto);
    return data;
  }

  @UseGuards(CheckAuthGuard)
  @UseInterceptors(UserIdInterceptor)
  @Delete('subscription/delete')
  public async deleteSubscription(@Body() dto: UserSubscriptionDto) {

    const { data } = await this.httpService.axiosRef.delete(`${ApplicationServiceURL.Subscription}/delete`, { data: dto });
    return data;
  }

  @UseGuards(CheckAuthGuard)
  @UseInterceptors(UserIdInterceptor)
  @Get('notify/newtraining')
  public async getTrainingAndNotify(@Req() req: Request) {

    const { data } = await this.httpService.axiosRef.get(`${ApplicationServiceURL.Auth}/notify/newtraining`, {
      headers: {
        'Authorization': req.headers['authorization']
      }
    });
    return data;
  }

  @UseGuards(CheckAuthGuard)
  @UseInterceptors(InintiatorIdInterceptor)
  @UseInterceptors(RoleUserInterceptor)
  @UseInterceptors(UserIdExistsInterceptor)
  @Post('request/training/create')
  public async createTrainingRequest(@Req() req: Request, @Body() dto: CreateRequestDto) {
    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Request}/create`, dto);
    return data;
  }

  @UseGuards(CheckAuthGuard)
  @UseInterceptors(InintiatorIdInterceptor)
  @UseInterceptors(RoleUserInterceptor)
  @Post('request/update/:id')
  public async editTrainingRequest(@Param('id', MongoidValidationPipe) id: string, @Body() requestStatus: string) {

    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Request}/update/${id}`, requestStatus);
    return data;
  }


}
