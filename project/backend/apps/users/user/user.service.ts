import { Injectable, Logger, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { randomUUID } from 'crypto';
import { User, RefreshTokenPayload } from '../../../libs/shared/app-types/src/index.js';
import { RefreshTokenService } from '../../refresh-token/refresh-token.service.js';
import { UserEntity } from './user.entity.js';
import { UserRepository } from './user.repository.js';
import { CreateUserDto } from '../dto/create-user.dto.js';
import { LoginUserDto } from '../dto/login-user.dto.js';
import { UserMessages } from './user.constant.js';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UserService {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly jwtService: JwtService,
        private readonly refreshTokenService: RefreshTokenService,
        private readonly logger: Logger,
        private readonly configService: ConfigService,
    ) { }

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

    public async getUser(id: number) {
        return this.userRepository.findById(id);
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
}
