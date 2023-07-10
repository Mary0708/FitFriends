import { Controller } from '@nestjs/common';
import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { RabbitRouting } from '@fit-friends/shared/app-types';
import { MailService } from '../mail/mail.service';
import { UserNotifyService } from './user-notify.service';
import { NotifyUserDto } from './dto/notify-user.dto';

@Controller()
export class UserNotifyController {
  constructor(
    private readonly userNotifyService: UserNotifyService,
    private readonly mailService: MailService,
  ) {}

  @RabbitSubscribe({
    exchange: 'fitfriends.notify',
    routingKey: RabbitRouting.AddUserNotify,
    queue: 'fitfriends.notify.user',
  })
  public async create(dto: NotifyUserDto) {
    this.userNotifyService.addNotifyUser(dto);
    const notifyStr = dto.text+dto.initiatorName;
    this.mailService.sendNotifyUser(dto.email, notifyStr);


  }
}
