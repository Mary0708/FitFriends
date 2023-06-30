import { Injectable, Logger, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { randomUUID } from 'crypto';
import { User, RefreshTokenPayload, UserRole } from '@fit-friends/shared/app-types';
import { RefreshTokenService } from '../refresh-token/refresh-token.service.js';
import { UserEntity } from './user.entity.js';
import { UserRepository } from './user.repository.js';
import { CreateUserDto } from '../dto/create-user.dto.js';
import { LoginUserDto } from '../dto/login-user.dto.js';
import { UserMessages } from './user.constant.js';
import { ConfigService } from '@nestjs/config';
import { UserExistsException, UserFriendIdException, UserNotFoundIdException, UserRoleChangeException, UserRoleException, UsersNotFoundException } from '@fit-friends/utils/util-types';
import { UpdateUserDto } from '../dto/update-user.dto.js';
import { UserQuery } from '../query/user.query.js';

@Injectable()
export class UserService {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly configService: ConfigService,
        private readonly jwtService: JwtService,
        private readonly refreshTokenService: RefreshTokenService,
        private readonly logger: Logger,
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

    public async loginUser(user: Pick<User, 'id' | 'email' | 'name' | 'role'>, refreshTokenId: string) {
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
}
