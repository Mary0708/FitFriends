import { Injectable, NotFoundException, Logger} from '@nestjs/common';
import {  USER_IS_INITIATOR, REQUEST_NOT_FOUND } from './training-request.constant';
import { TrainingRequestRepository } from './training-request.repository';
import { TrainingRequestEntity } from './training-request.entity';
import { RequestStatus, RequestStatusType, TrainingRequest } from '@fit-friends/shared/app-types';
import { CreateRequestDto } from './dto/create-request.dto';
import { RequestExistsException, RequestNotFoundIdException } from '@fit-friends/utils/util-core';

@Injectable()
export class TrainingRequestService {
  constructor(
    private readonly requestRepository: TrainingRequestRepository,
    private readonly logger: Logger,
  ) {}

  public async getRequestById(id: number) {
    const existRequest = await this.requestRepository.findById(id);
    if (!existRequest) {
      throw new RequestNotFoundIdException(this.logger, id);
    }

    return existRequest;
  }

  public async create(dto: CreateRequestDto, initiatorId: number): Promise<TrainingRequest> {
    const existRequest = await this.requestRepository.find({ category: dto.category }, { userId: dto.userId, initiatorId });
    if (existRequest.length) {
      throw new RequestExistsException(this.logger);
    }

    if (dto.userId === dto.initiatorId) {
     throw new NotFoundException(USER_IS_INITIATOR);
    }
    
    const requestEntity = new TrainingRequestEntity(dto);
    return this.requestRepository.create(requestEntity);
  }

  public async updateStatus(id: number, newStatus: RequestStatusType) {
    const existsRequests = await this.requestRepository.findById(id)
    if (!existsRequests) {
      return {error: REQUEST_NOT_FOUND}
    }
    if (existsRequests.requestStatus === newStatus) {
      return existsRequests
    }
    return this.requestRepository.updateStatus(id, newStatus);
  }

  public async delete(id: number) {
    const existsRequests = await this.requestRepository.findById(id)
    if (!existsRequests) {
      return {error: REQUEST_NOT_FOUND}
    }
    return this.requestRepository.destroy(existsRequests._id);
  }

}
