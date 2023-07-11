import { Body, Controller, Get, HttpCode, HttpStatus, Patch, Query, Req, UseGuards } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserBalanceService } from './user-balance.service';
import { ApiIndexQuery } from './query/user-balance.api-query.decorator';
import { UserBalanceQuery } from './query/user-balance.query';
import { UserBalanceRdo } from './rdo/user-balance.rdo';
import { UpdateUserBalanceDto } from './dto/update-user-balance.dto';
import { UserRole, RequestWithTokenPayload, TokenPayload } from '@fit-friends/shared/app-types';
import { Roles, fillObject } from '@fit-friends/utils/util-core';
import { RolesGuard, JwtAuthGuard } from '@fit-friends/utils/util-types';

@ApiTags('user-balance')
@Controller('user-balance')
export class UserBalanceController {
  constructor(
    private readonly balanceService: UserBalanceService,
  ) { }

  @Get('/')
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Roles(`${UserRole.User}`)
  @ApiIndexQuery()
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: HttpStatus.OK, description: 'Resource for getting a balance of an authorized client', type: [UserBalanceRdo] })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Balance not found', })
  async index(@Query() query: UserBalanceQuery, @Req() { user }: RequestWithTokenPayload<TokenPayload>) {
    const users = await this.balanceService.getUserBalance(query, user.sub);
    return fillObject(UserBalanceRdo, users);
  }

  @Patch('/')
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Roles(`${UserRole.User}`)
  @ApiResponse({ status: HttpStatus.OK, description: 'Resource for decreasing user balance', type: UserBalanceRdo })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Balance not found' })
  public async decrease(@Req() { user }: RequestWithTokenPayload<TokenPayload>, @Body() dto: UpdateUserBalanceDto) {
    const updatedBalance = await this.balanceService.updateUserBalance(dto.category, dto.serviceId, user.sub, false);
    return fillObject(UserBalanceRdo, updatedBalance);
  }
}
