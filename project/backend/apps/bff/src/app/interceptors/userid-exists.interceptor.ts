import { HttpService } from '@nestjs/axios';
import { CallHandler, ConflictException, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { ApplicationServiceURL } from '../app.config';

@Injectable()
export class UserIdExistsInterceptor implements NestInterceptor {
  constructor(
    private readonly httpService: HttpService,
  ) {}
  public async intercept(context: ExecutionContext, next: CallHandler) {
    const request = context.switchToHttp().getRequest();

    const { data } = await this.httpService.axiosRef.get(`${ApplicationServiceURL.Users}/${request.body.userId}`,  {
      headers: {
        'Authorization': request.headers['authorization']
      }
    });
    if (!data.id) {
      throw new ConflictException('Указанного пользователя не существует')
    }


    return next.handle();
  }
}
