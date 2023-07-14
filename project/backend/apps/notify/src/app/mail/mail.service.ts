import { Subscriber } from '@fit-friends/shared/app-types';
import { Injectable } from '@nestjs/common';
import { EMAIL_ADD_SUBSCRIBER_SUBJECT, EMAIL_ADD_NOTIFY_TRAINING_SUBJECT, EMAIL_ADD_USER_NOTIFY_SUBJECT } from './mail.constant';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  public async sendNotifyNewSubscriber(subscriber: Subscriber) {
    await this.mailerService.sendMail({
      to: subscriber.email,
      subject: EMAIL_ADD_SUBSCRIBER_SUBJECT,
      template: './add-subscriber',
      context: {
        user: `${subscriber.name}`,
        email: `${subscriber.email}`,
      }
    })
  }

  public async sendNotifyNewTraining(email: string, trainingStr: string) {
    await this.mailerService.sendMail({
      to: email,
      subject: EMAIL_ADD_NOTIFY_TRAINING_SUBJECT,
      template: './new-training',
      context: {
        training: `${trainingStr}`,
      }
    })
  }

  public async sendNotifyUser(email: string, notifyStr: string) {
    await this.mailerService.sendMail({
      to: email,
      subject: EMAIL_ADD_USER_NOTIFY_SUBJECT,
      template: './user-notify',
      context: {
        notify: `${notifyStr}`,
      }
    })
  }
}
