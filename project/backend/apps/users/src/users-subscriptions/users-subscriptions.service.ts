import { ConflictException, Injectable } from '@nestjs/common';
import { UsersSubscriptionsRepository } from './users-subscriptions.repository';
import { AUTH_SUBSCRIPT_CONFLICT, AUTH_SUBSCRIPT_EXISTS, AUTH_SUBSCRIPT_NOT_FOUND, AUTH_USER_NOT_FOUND, AUTH_SUB_USER_NOT_FOUND, AUTH_SUBSCRIPT_ROLE_CONFLICT } from './subscriptions.constant';
import { SubscriptionEntity } from './subscriptions.entity';
import { UserRepository } from '../user/user.repository';
import { UserRole } from '@fit-friends/shared/app-types';
import { UserSubscriptionDto } from '../dto/user-subscription.dto';

@Injectable()
export class SubscriptionsService {
  constructor(
    private readonly usersSubscriptionsRepository: UsersSubscriptionsRepository,
    private readonly userRepository: UserRepository,
  ) {}

  public async create(dto: UserSubscriptionDto) {
    if (dto.userId === dto.coachId) {
      throw new ConflictException(AUTH_SUBSCRIPT_CONFLICT);
    }
    const existsUserID = await this.userRepository.findById(dto.userId);
    const existsSubscriptionId = await this.userRepository.findById(dto.coachId);

     if (!existsUserID) {
        return {error: AUTH_USER_NOT_FOUND}
     }
    
     if (!existsSubscriptionId) {
      return {error: AUTH_SUB_USER_NOT_FOUND}
   }
    const existSubscription = await this.usersSubscriptionsRepository
      .findSubscriptionByUserId(dto.userId, dto.coachId);
   
      if (existSubscription) {
      return {error: AUTH_SUBSCRIPT_EXISTS}
    }

    if (existsSubscriptionId.role === UserRole.User) {
      return {error: AUTH_SUBSCRIPT_ROLE_CONFLICT}
    }

    const userEntity = await new SubscriptionEntity(dto)

    return this.usersSubscriptionsRepository
      .create(userEntity);
  }

  public async delete(dto: UserSubscriptionDto) {
    const existSubscription = await this.usersSubscriptionsRepository
      .findSubscriptionByUserId(dto.userId, dto.coachId);
    if (!existSubscription) {
      return {error: AUTH_SUBSCRIPT_NOT_FOUND}
    }

    this.usersSubscriptionsRepository
      .delete(dto.userId, dto.coachId);
  }

  public async getByUserId(userId: number) {
    return this.usersSubscriptionsRepository
      .findByUserId(userId);
  }

  public async getByCoachId(coachId: number) {
    return this.usersSubscriptionsRepository
      .findByCoachId(coachId);
  }
}
