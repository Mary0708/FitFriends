import { Body, Controller, Get, Param, Post, Query, UseFilters, UseGuards, UseInterceptors } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ApplicationServiceURL } from './app.config';
import { AxiosExceptionFilter } from './filters/axios-exception.filter';
import { CheckAuthGuard } from './guards/check-auth.guard';
import { RoleUserInterceptor } from './interceptors/role-user.interceptor';
import { UserIdInterceptor } from './interceptors/userid.interceptor';
import { CommentDto } from '@fit-friends/training/training-dto';
import { TrainingCatalogQuery, DefaultQuery } from '@fit-friends/training/training-query';

@Controller('training')
@UseFilters(AxiosExceptionFilter)
export class TrainingGeneralController {
  constructor(
    private readonly httpService: HttpService
  ) {}


  @UseGuards(CheckAuthGuard)
  @Get('catalog')
  public async showCatalog(@Query() query: TrainingCatalogQuery) {
    const { data } = await this.httpService.axiosRef.get(`${ApplicationServiceURL.Training}/show/catalog`, {params : query});
   return data;
  }

  @UseGuards(CheckAuthGuard)
  @UseInterceptors(RoleUserInterceptor)
  @UseInterceptors(UserIdInterceptor)
  @Post('/comments/create/:id')
  public async createComment(@Param('id') id: string, @Body() dto: CommentDto) {
    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Comments}/create/${id}`, dto);
   return data;
  }

  @UseGuards(CheckAuthGuard)
  @UseInterceptors(RoleUserInterceptor)
  @Get('/comments/:id')
  public async showCommentsByTraining(@Param('id') id: string, @Query() query: DefaultQuery) {
    const { data } = await this.httpService.axiosRef.get(`${ApplicationServiceURL.Comments}/${id}`, {params : query});
   return data;
  }
}
