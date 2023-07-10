import { Controller } from '@nestjs/common';
import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { RabbitRouting } from '@fit-friends/shared/app-types';
import { MailService } from '../mail/mail.service';
import { NewTrainingService } from './new-training.service';
import { NotifyTrainingDto } from './dto/notify-training.dto';

@Controller()
export class NewTrainingController {
  constructor(
    private readonly newTrainingService: NewTrainingService,
    private readonly mailService: MailService,
  ) {}

  @RabbitSubscribe({
    exchange: 'fitfriends.notify',
    routingKey: RabbitRouting.AddNotifyTraining,
    queue: 'fitfriends.notify.training',
  })
  public async create(dto: NotifyTrainingDto) {
    this.newTrainingService.addNotifyTraining(dto);
    const trainingStr =
        dto.training.length !== 0
        ? dto.training.map((el) => el.title + '\n' + el.description + '\n' + el.coachName + '\n' + el.createDate+' ********').join('\n')
        : 'Новых тренировок нет'
    this.mailService.sendNotifyNewTraining(dto.email, trainingStr);


  }
}
