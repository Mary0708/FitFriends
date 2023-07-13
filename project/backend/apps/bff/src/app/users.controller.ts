import { Body, Controller, Delete, Get, Param, Post, Query, Req, UseFilters, UseGuards, UseInterceptors } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ApplicationServiceURL } from './app.config';
import { Request } from 'express';
import { AxiosExceptionFilter } from './filters/axios-exception.filter';
import { CreateUserDto, UpdateUserDto, LoginUserDto } from '@fit-friends/user/user-dto';
import { MongoidValidationPipe } from '@fit-friends/shared/shared-pipes';
import { UserIdInterceptor } from './interceptors/userid.interceptor';
import { CheckAuthGuard } from './guards/check-auth.guard';
import { UserIsAuthInterceptor } from './interceptors/user-is-auth.interceptor';
import { RoleUserInterceptor } from './interceptors/role-user.interceptor';
import { UserQuery } from '../../../users/src/query/user.query';
import { UserIdNotifyInterceptor } from './interceptors/userid-notify.interceptor';

@Controller('users')
@UseFilters(AxiosExceptionFilter)
export class UsersController {
  constructor(
    private readonly httpService: HttpService
  ) {}
  @Post('register')
  public async create(@Body() createUserDto: CreateUserDto) {
    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Auth}/register`, createUserDto);
    return data;
  }

  @UseGuards(CheckAuthGuard)
  @UseInterceptors(UserIsAuthInterceptor)
  @Post('login')
  public async login(@Body() loginUserDto: LoginUserDto ) {
    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Auth}/login`, loginUserDto);
    return data;
  }

  @Post('refresh')
  public async refreshToken(@Req() req: Request) {
    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Auth}/refresh`, null, {
      headers: {
        'Authorization': req.headers['authorization']
      }
    });

    return data;
  }


  @Post('refresh/delete')
  public async deleteRefreshToken(@Req() req: Request) {
    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Auth}/refresh/delete`, null, {
      headers: {
        'Authorization': req.headers['authorization']
      }
    });

    return data;
  }

  @UseGuards(CheckAuthGuard)
  @UseInterceptors(UserIdInterceptor)
  @Get('/:id')
  public async show(@Req() req: Request, @Param('id', MongoidValidationPipe) id: string) {
    const { data } = await this.httpService.axiosRef.get(`${ApplicationServiceURL.Users}/${id}`,  {
      headers: {
        'Authorization': req.headers['authorization']
      }
    });
    return data;
}

  @UseGuards(CheckAuthGuard)
  @Post('edit')
  public async edit(@Req() req: Request, @Body() UpdateUserDto: UpdateUserDto) {
    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Users}/edit`, UpdateUserDto, {
      headers: {
        'Authorization': req.headers['authorization']
      }
    });
    return data;
}

@UseGuards(CheckAuthGuard)
@UseInterceptors(RoleUserInterceptor)
@Get('')
public async showList(@Req() req: Request, @Query() query: UserQuery) {
  const { data } = await this.httpService.axiosRef.get(`${ApplicationServiceURL.Users}`,  {
    params : query,
    headers: {
      'Authorization': req.headers['authorization']
    }
  });
  return data;
}


@UseGuards(CheckAuthGuard)
@UseInterceptors(UserIdInterceptor)
@Get('notify/show')
public async showNotifyUser(@Req() req: Request) {
  const { data } = await this.httpService.axiosRef.get(`${ApplicationServiceURL.Users}/notify/show`,  {
    headers: {
      'Authorization': req.headers['authorization']
    }
  });
  return data;
}

@UseGuards(CheckAuthGuard)
@UseInterceptors(UserIdInterceptor)
@UseInterceptors(UserIdNotifyInterceptor)
@Delete('notify/delete/:id')
public async deleteNotifyById(@Req() req: Request, @Param('id', MongoidValidationPipe) id: string) {
  const { data } = await this.httpService.axiosRef.delete(`${ApplicationServiceURL.Users}/notify/delete/${id}`,
    {
      headers: {
        'Authorization': req.headers['authorization']
      }
    }
  );
  return data;
}

}
