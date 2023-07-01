import { Injectable, Logger, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { randomUUID } from 'crypto';
import { User, RefreshTokenPayload, UserRole, Training } from '@fit-friends/shared/app-types';
import { RefreshTokenService } from '../refresh-token/refresh-token.service';
import { UserEntity } from './user.entity';
import { UserRepository } from './user.repository';
import { CreateUserDto } from '../dto/create-user.dto';
import { LoginUserDto } from '../dto/login-user.dto';
import { UserMessages } from './user.constant';
import { ConfigService } from '@nestjs/config';
import { UserExistsException, UserFriendIdException, UserNotFoundIdException, UserRoleChangeException, UserRoleException, UsersNotFoundException } from '@fit-friends/utils/util-types';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UserQuery } from '../query/user.query';
import { resolve } from 'path';
import { getFileName, isFolderExistsOrCreate } from '@fit-friends/utils/util-core';
import { writeFileSync, existsSync, unlinkSync } from 'fs';
import { MailService } from '../mail/mail.service';
import { NotifyService } from '../notify/notify.service';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    private readonly refreshTokenService: RefreshTokenService,
    private readonly logger: Logger,
    private readonly mail: MailService,
    private readonly notifyService: NotifyService,
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

  public async loginUser(user: Pick<User, 'id' | 'email' | 'name' | 'role'>, refreshTokenId?: string) {
    const payload = {
      sub: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    };

    await this.refreshTokenService.deleteRefreshSession(refreshTokenId);

    const refreshTokenPayload: RefreshTokenPayload = { ...payload, refreshTokenId: randomUUID() }

    await this.refreshTokenService.createRefreshSession(refreshTokenPayload);

    return {
      email: user.email,
      access_token: await this.jwtService.signAsync(payload),
      refresh_token: await this.jwtService.signAsync(refreshTokenPayload, {
        secret: this.configService.get<string>('jwt.refreshTokenSecret'),
        expiresIn: this.configService.get<string>('jwt.refreshTokenExpiresIn')
      })
    };
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

  async removeFriend(userId: number, friendId: number, userName: string): Promise<void> {
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

  public async updateSubscription(userId: number, coachId: number, isFollow: boolean): Promise<User> {
    const [, coach] = await this.checkUserIdMatch(userId, coachId);
    if (coach.role !== UserRole.Coach) {
      throw new UserRoleException(this.logger, coachId);
    }

    return this.userRepository.changeSubscription(userId, coachId, isFollow);
  }

  public async updateUserAvatar(id: number, file: Express.Multer.File): Promise<User> {
    const existUser = await this.getUserById(id);
    const userAvatar = existUser?.avatar;
    const avatarName = getFileName(file);
    const avatarPath = resolve(
      __dirname,
      this.configService.get<string>('file.dest'),
      this.configService.get<string>('file.avatarUploadFolder'),
      existUser.id.toString(),
    );

    isFolderExistsOrCreate(avatarPath);
    writeFileSync(resolve(avatarPath, avatarName), file.buffer);

    if (userAvatar && avatarName) {
      const oldAvatar = resolve(avatarPath, userAvatar);
      if (existsSync(oldAvatar)) {
        unlinkSync(oldAvatar);
      }
    }

    delete existUser["coachFeatures"];
    delete existUser["userFeatures"];

    return this.userRepository.update(id, { ...existUser, avatar: avatarName, updatedAt: new Date() });
  }

  public async updateCoachCertificate(id: number, file: Express.Multer.File): Promise<User> {
    const existUser = await this.getUserById(id);
    const coachFeature = existUser['coachFeatures'];
    const certificateName = getFileName(file);
    const certificatePath = resolve(
      __dirname,
      this.configService.get<string>('file.dest'),
      this.configService.get<string>('file.certificateUploadFolder'),
      existUser.id.toString(),
    );

    isFolderExistsOrCreate(certificatePath);
    writeFileSync(resolve(certificatePath, certificateName), file.buffer);

    if (coachFeature.certificate && certificateName) {
      const oldCertificate = resolve(certificatePath, coachFeature.certificate);
      if (existsSync(oldCertificate)) {
        unlinkSync(oldCertificate);
      }
    }

    delete coachFeature.id;
    coachFeature.certificate = certificateName;


    return this.userRepository.update(id, { features: coachFeature, updatedAt: new Date() });
  }

  public async getUserAvatarPath(id: number): Promise<string> {
    const existUser = await this.getUserById(id);
    const defaultAvatar = this.configService.get<string>('file.defaultAvatar');

    if (existUser.avatar === defaultAvatar) {
      return resolve(
        __dirname,
        this.configService.get<string>('file.defaultResourceFolder'),
        this.configService.get<string>('file.defaultAvatarFolder'),
        existUser.avatar
      );
    }

    return resolve(
      __dirname,
      this.configService.get<string>('file.dest'),
      this.configService.get<string>('file.avatarUploadFolder'),
      existUser.id.toString(),
      existUser.avatar
    );
  }

  public async getCoachCertificatePath(id: number): Promise<string> {
    const existUser = await this.getUserById(id);
    const coachFeature = existUser['coachFeatures'];

    return resolve(
      __dirname,
      this.configService.get<string>('file.dest'),
      this.configService.get<string>('file.certificateUploadFolder'),
      existUser.id.toString(),
      coachFeature.certificate
    );
  }

  public async sendEmailToSubscribedUsers(coachId: number, training: Training): Promise<void> {
    const users = await this.userRepository.findSubscribed(coachId);
    for (const user of users) {
      this.mail.sendMailNewTraining(user, training);
    }
  }
}