import { getMongooseOptions } from '@fit-friends/utils/util-core';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PrismaModule } from '../../../libs/utils/util-types/src/lib/prisma/prisma.module';
import { RefreshTokenModule } from './refresh-token/refresh-token.module';
import { UsersModule } from './user/user.module';
import { NotifyUserModel } from './user-notify/notify-user.model';
import { UserBalanceModule } from './user-balance/user-balance.module.js';
import { UserDiaryModule } from './user-diaries/user-diary.module.js';

@Module({
  imports: [
    UsersModule,
    PrismaModule,
    RefreshTokenModule,
    NotifyUserModel,
    UserBalanceModule,
    UserDiaryModule,
    MongooseModule.forRootAsync(
      getMongooseOptions('db')
    )
  ],
})

export class AppModule { }
