import { Body, Controller, Get, Param, Post, Query, Req, UseFilters, UseGuards, UseInterceptors } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ApplicationServiceURL } from './app.config';
import { Request } from 'express';
import { AxiosExceptionFilter } from './filters/axios-exception.filter';
import { DefaultQuery } from '../../../training/src/query/default.query';
import { TrainingOrdersQuery } from '../../../training/src/query/training-orders.query';
import { MongoidValidationPipe } from '@fit-friends/shared/shared-pipes';
import { CheckAuthGuard } from './guards/check-auth.guard';
import { RoleCoachInterceptor } from './interceptors/role-coach.interceptor';
import { UserIdTrainingInterceptor } from './interceptors/userid-training.interceptor';
import { CoachIdInterceptor } from './interceptors/coachId.interceptor';
import { CreateTrainingDTO, EditTrainingDTO } from '@fit-friends/training/training-dto';
import { TrainingQuery } from '@fit-friends/training/training-query';

@Controller('coach')
@UseFilters(AxiosExceptionFilter)
export class CoachAccountController {
  constructor(
    private readonly httpService: HttpService
  ) { }

  @UseGuards(CheckAuthGuard)
  @UseInterceptors(RoleCoachInterceptor)
  @UseInterceptors(CoachIdInterceptor)
  @Post('/training/create')
  public async create(@Body() dto: CreateTrainingDTO) {
    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Training}/create`, dto);
    return data;
  }

  @UseGuards(CheckAuthGuard)
  @UseInterceptors(RoleCoachInterceptor)
  @UseInterceptors(CoachIdInterceptor)
  @Get('training/show/list')
  public async showList(@Body() coachId: number, @Query() query: TrainingQuery) {
    const { data } = await this.httpService.axiosRef.get(`${ApplicationServiceURL.Training}/show/list`, { params: query, data: coachId });
    return data;
  }

  @UseGuards(CheckAuthGuard)
  @UseInterceptors(RoleCoachInterceptor)
  @UseInterceptors(UserIdTrainingInterceptor)
  @Post('training/edit/:id')
  public async update(@Body() dto: EditTrainingDTO, @Param('id', MongoidValidationPipe) id: string) {
    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Training}/edit/${id}`, dto);
    return data;
  }

  @UseGuards(CheckAuthGuard)
  @Get('training/:id')
  public async show(@Param('id', MongoidValidationPipe) id: string) {
    const { data } = await this.httpService.axiosRef.get(`${ApplicationServiceURL.Training}/${id}`);
    return data;
  }

  @UseGuards(CheckAuthGuard)
  @UseInterceptors(RoleCoachInterceptor)
  @UseInterceptors(CoachIdInterceptor)
  @Get('orders')
  public async showOrders(@Body() coachId: number, @Query() query: TrainingOrdersQuery) {
    const { data } = await this.httpService.axiosRef.get(`${ApplicationServiceURL.Orders}/show/list`, { params: query, data: coachId });
    return data;
  }

  @UseGuards(CheckAuthGuard)
  @UseInterceptors(CoachIdInterceptor)
  @Get('friends/show')
  public async showFriends(@Req() req: Request, @Query() query: DefaultQuery) {
    const { data } = await this.httpService.axiosRef.get(`${ApplicationServiceURL.Friends}/coach`, {
      params: query,
      headers: {
        'Authorization': req.headers['authorization']
      }
    });
    return data;
  }

  @UseGuards(CheckAuthGuard)
  @UseInterceptors(RoleCoachInterceptor)
  @UseInterceptors(CoachIdInterceptor)
  @Post('friends/delete/:userId')
  public async deleteFriend(@Req() req: Request, @Param('userId', MongoidValidationPipe) userId: number) {
    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Friends}/delete/coach/${userId}`, null, {
      headers: {
        'Authorization': req.headers['authorization']
      }
    });
    return data;
  }
}
