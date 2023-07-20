import { Inject, Injectable, Logger, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { randomUUID } from 'crypto';
import { User, RefreshTokenPayload, UserRole, TokenLogin } from '@fit-friends/shared/app-types';
import { RefreshTokenService } from '../refresh-token/refresh-token.service';
import { UserEntity } from './user.entity';
import { UserRepository } from './user.repository';
import { CreateUserDto } from '../dto/create-user.dto';
import { LoginUserDto } from '../dto/login-user.dto';
import { UserMessages } from './user.constant';
import { ConfigService, ConfigType } from '@nestjs/config';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UserQuery } from '../query/user.query';
import { UserExistsException, UserFriendIdException, UserNotFoundIdException, UserRoleChangeException, UsersNotFoundException, createJWTPayload } from '@fit-friends/utils/util-core';
import { jwtConfig } from '@fit-friends/config/config-users';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    private readonly refreshTokenService: RefreshTokenService,
    private readonly logger: Logger,
    @Inject (jwtConfig.KEY) private readonly jwtOptions: ConfigType<typeof jwtConfig>,
  ) { }

  private async checkUserIdMatch(userFirstId: number, userSecondId: number): Promise<User[]> {
    const first = await this.getUserById(userFirstId);
    const second = await this.getUserById(userSecondId);

    if (first.id === second.id) {
      throw new UserFriendIdException(this.logger);
    }

    return [first, second];
  }

  public async getUserById(id: number): Promise<User> {
    const existUser = await this.userRepository.findById(id);

    if (!existUser) {
      throw new UserNotFoundIdException(this.logger, id);
    }

    return existUser;
  }

  public async register(dto: CreateUserDto): Promise<User> {
    const { email, password } = dto;
    const existUser = await this.userRepository.findByEmail(email);

    if (existUser) {
      throw new UserExistsException(this.logger, email);
    }
    const userEntity = await new UserEntity({ ...dto, avatar: this.configService.get<string>('file.defaultAvatar') }).setPassword(password);

    return this.userRepository.create(userEntity);
  }

  public async verifyUser(dto: LoginUserDto): Promise<User> {
    const { email, password } = dto;
    const existUser = await this.userRepository.findByEmail(email);

    if (!existUser) {
      throw new NotFoundException(UserMessages.USER_NOT_FOUND);
    }

    const userEntity = new UserEntity(existUser);

    if (! await userEntity.comparePassword(password)) {
      throw new UnauthorizedException(UserMessages.UNAUTHORIZED);
    }

    return existUser;
  }

  public async createUserToken(user: User, tokenId: string, tokenInfo?: TokenLogin) {
   
    if (tokenInfo && tokenInfo.token && tokenInfo.userIdAuth === user.id.toString()) {
      return {accessToken: tokenInfo.token,  description: 'The user is logged in' }
    }

    const accessTokenPayload = createJWTPayload(user);
    await this.refreshTokenService.deleteRefreshSession(tokenId);
    const refreshTokenPayload = { ...accessTokenPayload, tokenId: crypto.randomUUID() };
    await this.refreshTokenService.createRefreshSession(refreshTokenPayload)

    return {
      accessToken: await this.jwtService.signAsync(accessTokenPayload),
      refreshToken: await this.jwtService.signAsync(refreshTokenPayload, {
        secret: this.jwtOptions.refreshTokenSecret,
        expiresIn: this.jwtOptions.refreshTokenExpiresIn
      })
    }
  }

  async getUsers(query: UserQuery): Promise<User[]> {
    const existUsers = await this.userRepository.find(query);

    if (!existUsers?.length) {
      throw new UsersNotFoundException(this.logger);
    }
    return existUsers;
  }

  public async updateUser(id: number, dto: UpdateUserDto): Promise<User> {
    const existUser = await this.getUserById(id);

    if (existUser.role !== dto.role) {
      throw new UserRoleChangeException(this.logger);
    }

    return this.userRepository.update(id, { ...dto, updatedAt: new Date() });
  }

  async logoutUser(id: number): Promise<void> {
    await this.getUserById(id);
    await this.refreshTokenService.deleteRefreshTokens(id);
  }

  async addFriend(userId: number, friendId: number): Promise<User> {
    await this.checkUserIdMatch(userId, friendId);
    return this.userRepository.addFriend(userId, friendId);
  }

  async removeFriend(userId: number, friendId: number): Promise<void> {
    await this.checkUserIdMatch(userId, friendId);
    await this.userRepository.removeFriend(userId, friendId);
  }

  async getFriends(userId: number, query: UserQuery): Promise<User[]> {
    const friends = await this.userRepository.find(query, userId);
    if (!friends?.length) {
      throw new UsersNotFoundException(this.logger);
    }
    return friends;
  }

  public async deleteUser(userId: number): Promise<void> {
    return this.userRepository.destroy(userId);
  }
}
