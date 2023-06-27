import { Logger, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { getJwtConfig } from '../../../libs/config/config-users/src';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';
import { RefreshTokenModule } from '../../refresh-token/refresh-token.module';
import { JwtAccessStrategy } from '../strategies/jwt-access.strategy.js';
import { LocalStrategy } from '../strategies/local.strategy';
import { JwtRefreshStrategy } from '../strategies/jwt-refresh.strategy';

@Module({
  imports: [
    PassportModule,
    RefreshTokenModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getJwtConfig,
    }),
  ],
  controllers: [UserController],
  providers: [
    UserService,
    UserRepository,
    JwtAccessStrategy,
    LocalStrategy,
    JwtRefreshStrategy,
    Logger
  ],
  exports: [UserService]
})

export class UsersModule { }
