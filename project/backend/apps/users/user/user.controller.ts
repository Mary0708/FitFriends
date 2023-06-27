import {
    Body, Controller, HttpCode, HttpStatus, Patch, 
    Post, Get, Res, Req, UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { fillObject } from '../../../libs/utils/util-core/src';
import { RefreshTokenPayload, TokenPayload } from '../../../libs/shared/app-types/src';
import { UserService } from './user.service';
import { UserMessages } from './user.constant';
import { UserRdo } from '../rdo/user.rdo.js';
import { CreateUserDto } from '../dto/create-user.dto';
import { JwtRefreshGuard } from '../guards/jwt-refresh.guard';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';

@ApiTags('users')
@Controller('users')
export class UserController {
    constructor(
        private readonly userService: UserService,
    ) { }

    @Post('register')
    @HttpCode(HttpStatus.CREATED)
    @ApiResponse({ status: HttpStatus.CREATED, description: 'Resource for user registration', type: UserRdo })
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: UserMessages.ALREADY_EXISTS })
    public async create(@Body() dto: CreateUserDto) {
        const newUser = await this.userService.register(dto);
        return fillObject(UserRdo, newUser);
    }

    @Post('refresh')
    @UseGuards(JwtRefreshGuard)
    @HttpCode(HttpStatus.OK)
    @ApiResponse({ status: HttpStatus.OK, description: 'Get a new access/refresh tokens', type: TokenPayload })
    @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: UserMessages.INVALID_TOKEN })
    async refresh(@Req() request: RequestWithTokenPayload<RefreshTokenPayload>) {
        const { user: tokenPayload } = request;
        return this.userService.loginUser({
            name: tokenPayload.name,
            role: tokenPayload.role,
            email: tokenPayload.email,
            id: tokenPayload.sub
        }, tokenPayload.refreshTokenId);
    }

    @Get('login')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiResponse({ status: HttpStatus.OK, description: UserMessages.LOGIN, type: TokenPayload })
    @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: UserMessages.UNAUTHORIZED })
    public async checkAuth(@Res() res: Response) {
        return res.status(HttpStatus.OK).send({ message: UserMessages.AUTHORIZED });
    }

}
