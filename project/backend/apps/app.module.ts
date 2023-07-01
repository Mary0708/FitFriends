import { getMongooseOptions } from "@fit-friends/utils/util-core";
import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { MailModule } from "./users/src/mail/mail.module.js";
import { PrismaModule } from "./users/src/prisma/prisma.module.js";
import { RefreshTokenModule } from "./users/src/refresh-token/refresh-token.module.js";
import { UsersModule } from "./users/src/user/user.module.js";

@Module({
  imports: [
    UsersModule,
    PrismaModule,
    RefreshTokenModule,
    MailModule,
    MongooseModule.forRootAsync(
      getMongooseOptions('db')
  )
  ],
})

export class AppModule { }
