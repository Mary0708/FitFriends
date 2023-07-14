import { RequestNotFoundIdException, RequestSameUserException, RequestExistsException, RequestUpdateNotAllowedException, RequestsNotFoundException } from '@fit-friends/utils/util-core';
import { Injectable, Logger } from '@nestjs/common';
import { RequestStatus, RequestCategory } from '@prisma/client';
import { UserService } from 'apps/users/src/user/user.service';
import { CreateRequestDto } from '../../dto/create-request.dto';
import { RequestQuery } from '../../query/request.query';
import { UpdateRequestDto } from '../../dto/update-request.dto';
import { RequestRepository } from './request.repository';
import { RequestEntity } from './request.entity';
import { UserRequest } from '@fit-friends/shared/app-types';

@Injectable()
export class RequestService {
  constructor(
    private readonly userService: UserService,
    private readonly requestRepository: RequestRepository,
    private readonly logger: Logger,
  ) { }

  public async getRequestById(id: number) {
    const existReq = await this.requestRepository.findById(id);
    if (!existReq) {
      throw new RequestNotFoundIdException(this.logger, id);
    }

    return existReq;
  }

  public async createRequest(dto: CreateRequestDto, requesterId: number): Promise<UserRequest> {
    await this.userService.getUserById(dto.requestedId);
    const requester = await this.userService.getUserById(requesterId);
    if (requester.id === dto.requestedId) {
      throw new RequestSameUserException(this.logger);
    }

    const existRequest = await this.requestRepository.find({ category: dto.category }, { requestedId: dto.requestedId, requesterId });
    if (existRequest.length) {
      throw new RequestExistsException(this.logger);
    }

    const requestEntity = new RequestEntity({ ...dto, requesterId, status: RequestStatus.Pending });

      return this.requestRepository.create(requestEntity);
  }

  public async updateRequest({ status }: UpdateRequestDto, requestId: number, requestedId: number): Promise<UserRequest> {
    const existRequest = await this.getRequestById(requestId);

    if (existRequest.requestedId !== requestedId) {
      throw new RequestUpdateNotAllowedException(this.logger, existRequest.id, requestedId);
    }

    if (existRequest.status === status) {
      return existRequest;
    }

    const requested = await this.userService.getUserById(requestedId);

    if ((status === RequestStatus.Accepted) && existRequest.category === RequestCategory.Friendship) {
      await this.userService.addFriend(existRequest.requesterId, existRequest.requestedId);
    }

    return this.requestRepository.update(requestId, { status, updatedAt: new Date() });
  }

  async getRequests(query: RequestQuery, requestedId: number): Promise<UserRequest[]> {
    const existRequests = await this.requestRepository.find(query, { requestedId });
    if (!existRequests?.length) {
      throw new RequestsNotFoundException(this.logger);
    }
    return existRequests;
  }
}