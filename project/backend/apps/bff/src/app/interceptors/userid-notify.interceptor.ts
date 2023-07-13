import { HttpService } from '@nestjs/axios';
import { CallHandler, ConflictException, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { ApplicationServiceURL } from '../app.config';

@Injectable()
export class UserIdNotifyInterceptor implements NestInterceptor {
  constructor(
    private readonly httpService: HttpService,
  ) {}
  public async intercept(context: ExecutionContext, next: CallHandler) {
    const request = context.switchToHttp().getRequest();
    const {data} = await this.httpService.axiosRef.get(`${ApplicationServiceURL.Users}/notify/get/${request.params.id}`);
    if (request.user.sub !== data.userId) {
      throw new ConflictException('Пользователи могут удалять только свои оповещения')
    }
    return next.handle();
  }
}
