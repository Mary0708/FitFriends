import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { NotifyUserModel, NotifyUserSchema } from './notify-user.model';
import { NotifyUserRepository } from './notify-user.repository';
import { NotifyUserService } from './notify-user.service';


@Module({
  imports: [MongooseModule.forFeature([
    { name: NotifyUserModel.name, schema: NotifyUserSchema }
  ])],
  providers: [NotifyUserRepository, NotifyUserService],
  exports: [NotifyUserRepository, NotifyUserService]
})
export class NotifyUserModule {}
