import { Injectable, Logger } from '@nestjs/common';
import { TrainingRepository } from './training.repository';
import { TrainingEntity } from './training.entity';
import { Training } from '@fit-friends/shared/app-types';
import { TrainingNotFoundIdException, TrainingNotOwnerIdException, TrainingsNotFoundException, UserNotFoundIdException } from '@fit-friends/utils/util-core';
import { UserService } from 'apps/users/src/user/user.service';
import { CreateTrainingDTO } from '../../dto/create-training.dto.js';
import { EditTrainingDTO } from '../../dto/edit-training.dto.js';
import { TrainingCatalogQuery } from '../../query/training-catalog.query.js';
import { TrainingQuery } from '../../query/training.query.js';

@Injectable()
export class TrainingService {
  constructor(
    private readonly userService: UserService,
    private readonly trainingRepository: TrainingRepository,
    private readonly logger: Logger,

  ) { }

  private async checkTrainingOwner(id: number, coachId: number): Promise<Training> {
    const user = await this.userService.getUserById(coachId);
    const training = await this.getTrainingById(id);
   
    if (user.id !== training.coachId) {
      throw new TrainingNotOwnerIdException(this.logger, id, coachId);
    }

    return training;
  }

  async getTrainingById(id: number): Promise<Training> {
    const existTraining = await this.trainingRepository.findById(id);
    
    if (!existTraining) {
      throw new TrainingNotFoundIdException(this.logger, id);
    }

    return existTraining;
  }

  public async create(dto: CreateTrainingDTO, coachId: number) {
    const existCoach = await this.userService.getUserById(coachId);
    
    if (!existCoach) {
      throw new UserNotFoundIdException(this.logger, coachId);
    }

    const trainingEntity = new TrainingEntity({ ...dto, backgroundImage: ' ', video: ' ', rating: 0 });
    return this.trainingRepository.create(trainingEntity);
  }

  public async update(id: number, dto: EditTrainingDTO, coachId: number) {
    const existTraining = await this.checkTrainingOwner(id, coachId);

    if (!existTraining) {
      throw new TrainingsNotFoundException(this.logger)
    }

    const training = {
      ...dto,
      backgroundImage: existTraining.backgroundImage,
      video: existTraining.video,
      rating: existTraining.rating,
      coachId: existTraining.coachId
    };

    const trainingEntity = new TrainingEntity(training);
    return this.trainingRepository.update(id, trainingEntity);
  }

  public async show(id: number) {
    const existTraining = await this.trainingRepository.findById(id);
    
    if (!existTraining) {
        throw new TrainingsNotFoundException(this.logger)
    }
    return existTraining;
  }

  public async showList(coachId: number, query: TrainingQuery) {
    const existTraining = await this.trainingRepository.findByCoachId(coachId, query);
   
    if (!existTraining) {
        throw new TrainingsNotFoundException(this.logger)
    }
    return existTraining;
  }

  public async showCatalog(query: TrainingCatalogQuery) {
    const existTraining = await this.trainingRepository.findCatalog(query);
   
    if (!existTraining) {
        throw new TrainingsNotFoundException(this.logger)
    }
    return existTraining;
  }

  public async getListTrainingAfterDate(date: Date, coaches: [string]) {
    return this.trainingRepository.findTrainingAfterDate(date, coaches);
  }

  public async changeImg(trainingId: number, fileId: number) {
    const existTraining = await this.trainingRepository.findById(trainingId);
  
    if (!existTraining) {
        throw new TrainingsNotFoundException(this.logger)
    }
    return this.trainingRepository.updateImg(trainingId, fileId);
  }

  public async changeVideo(trainingId: number, fileId: string) {
    const existTraining = await this.trainingRepository.findById(trainingId);
  
    if (!existTraining) {
        throw new TrainingsNotFoundException(this.logger)
    }
    return this.trainingRepository.updateVideo(trainingId, fileId);
  }

  public async deleteTraining(orderId: number, userId: number) {
    await this.checkTrainingOwner(orderId, userId);
    return this.trainingRepository.destroy(orderId);
  }
}

 