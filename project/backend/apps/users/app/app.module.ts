import { Module } from '@nestjs/common';
import { RefreshTokenModule } from '../../refresh-token/refresh-token.module';
import { UsersModule } from '../user/user.module';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  imports: [
    PrismaModule,
    UsersModule,
    RefreshTokenModule,
  ],
})

export class AppModule { }
