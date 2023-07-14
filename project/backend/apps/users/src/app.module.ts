import { getMongooseOptions } from '@fit-friends/utils/util-core';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PrismaModule } from '@fit-friends/models/models-training';
import { RefreshTokenModule } from './refresh-token/refresh-token.module';
import { UsersModule } from './user/user.module';
import { NotifyUserModel } from './user-notify/notify-user.model';
import { UserBalanceModule } from './user-balance/user-balance.module';

@Module({
  imports: [
    UsersModule,
    PrismaModule,
    RefreshTokenModule,
    NotifyUserModel,
    UserBalanceModule,
    MongooseModule.forRootAsync(
      getMongooseOptions('db')
    )
  ],
})

export class AppModule { }
