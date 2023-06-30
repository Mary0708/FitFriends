import { Module } from '@nestjs/common';
import { RefreshTokenModule } from '../refresh-token/refresh-token.module';
import { UsersModule } from '../user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { getMongooseOptions } from '@fit-friends/utils/util-core';
import { PrismaModule } from '../prisma/prisma.module.js';


@Module({
  imports: [
    UsersModule,
    PrismaModule,
    RefreshTokenModule,
    MongooseModule.forRootAsync(
      getMongooseOptions('db')
  )
  ],
})

export class AppModule { }
