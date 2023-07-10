import { Injectable, Logger } from '@nestjs/common';
import { TrainingRepository } from './training.repository';
import { TRAINING_NOT_FOUND } from './training.constant';
import { TrainingEntity } from './training.entity';
import { CreateTrainingDTO } from './dto/create-training.dto';
import { EditTrainingDTO } from './dto/edit-training.dto';
import { TrainingCatalogQuery } from './query/training-catalog.query';
import { TrainingQuery } from './query/training.query';
import { Training } from '@fit-friends/shared/app-types';
import { ConfigService } from '@nestjs/config';
import { TrainingNotFoundIdException, TrainingsNotFoundException } from '@fit-friends/utils/util-core';

@Injectable()
export class TrainingService {
  constructor(
    private readonly trainingRepository: TrainingRepository,
    private readonly configService: ConfigService,
    private readonly logger: Logger,
  ) { }

  async getTrainingById(id: number): Promise<Training> {
    const existTraining = await this.trainingRepository.findById(id);
    if (!existTraining) {
      throw new TrainingNotFoundIdException(this.logger, id);
    }

    return existTraining;
  }

  public async create(dto: CreateTrainingDTO) {
    const trainingEntity = new TrainingEntity({ ...dto, backgroundImage: ' ', video: ' ', rating: 0 });
    return this.trainingRepository.create(trainingEntity);
  }

  public async update(id: number, dto: EditTrainingDTO) {
    const existTraining = await this.trainingRepository.findById(id);
    
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

  public async getListTraingAfterDate(date: Date, coaches: [string]) {
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

  public async createTestData(training) {
    const trainingEntity = new TrainingEntity({ ...training, backgroundImage: ' ', video: ' ' });
    return this.trainingRepository.create(trainingEntity);
  }
}

