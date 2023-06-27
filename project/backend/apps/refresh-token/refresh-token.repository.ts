import { Token } from '../../libs/shared/app-types/src';
import { Injectable } from '@nestjs/common/decorators/core/injectable.decorator';
import { RefreshTokenEntity } from './refresh-token.entity';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class RefreshTokenRepository {
  constructor(private readonly prisma: PrismaService) { }

  public async create(item: RefreshTokenEntity): Promise<Token> {
    return this.prisma.token.create({
      data: {
        ...item.toObject()
      }
    });
  }

  public async deleteByTokenId(tokenId: string) {
    return this.prisma.token.delete({
      where: { tokenId }
    });
  }

  public async findByTokenId(tokenId: string): Promise<Token | null> {
    return this.prisma.token.findFirst({
      where: { tokenId }
    })
  }

  public async deleteExpiredTokens() {
    return this.prisma.token.deleteMany({
      where: {
        expiresIn: { lt: new Date() }
      }
    })
  }

  public async deleteAll(userId: number) {
    return this.prisma.token.deleteMany({
      where: {
        userId
      }
    })
  }
}
