import { Injectable, Logger } from '@nestjs/common';
import { TrainingOrdersRepository } from './training-orders.repository';
import { TrainingOrdersEntity } from './training-orders.entity';
import { TrainingRepository } from '../training/training.repository';
import { CreateOrderDto } from './dto/create-order.dto';
import { TrainingOrdersQuery } from './query/training-orders.query';
import { GymService } from '../gyms/gym.service';
import { OrderCategory } from '@fit-friends/shared/app-types';
import { TrainingService } from '../training/training.service';
import { OrderNotFoundIdException, OrdersNotFoundException, OrderIsDoneException } from '@fit-friends/utils/util-core';
import { ORDER_TYPE } from '@fit-friends/utils/util-types';
import { UserBalanceService } from 'apps/users/src/user-balance/user-balance.service';

@Injectable()
export class TrainingOrdersService {
  constructor(
    private readonly ordersRepository: TrainingOrdersRepository,
    private readonly trainingService: TrainingService,
    private readonly trainingRepository: TrainingRepository,
    private readonly gymService: GymService,
    private readonly logger: Logger,
    private readonly balanceService: UserBalanceService,
  ) { }

  public async getOrderById(orderId: number) {
    const existOrder = await this.ordersRepository.findById(orderId);
    if (!existOrder) {
      throw new OrderNotFoundIdException(this.logger, orderId);
    }

    return existOrder;
  }

  public async create(dto: CreateOrderDto, userId: number) {
    const existTraining = await this.trainingRepository.findById(dto.trainingId)

    if (!existTraining) {
      throw new OrdersNotFoundException(this.logger)
    }

    const { price } = (dto.category === OrderCategory.Training) ?
      await this.trainingService.getTrainingById(dto.trainingId) :
      await this.gymService.getGymById(dto.trainingId);

    let trainingId = undefined;
    let gymId = undefined;

    if (dto.category === OrderCategory.Training) {
      trainingId = dto.trainingCount;
    } else {
      gymId = dto.trainingId;
    }

    await this.balanceService.updateUserBalance(dto.category, dto.trainingId, userId, true);

    delete dto.trainingId;

    const newOrder = new TrainingOrdersEntity({
      ...dto,
      orderType: ORDER_TYPE,
      coachId: existTraining.coachId,
      price: existTraining.price,
      totalPrice: price * dto.trainingCount,
      trainingRestCount: dto.trainingCount,
      trainingDoneCount: 0,
      isDone: false
    });

    return this.ordersRepository.create(newOrder);
  }

  public async update(orderId: number) {
    const existOrder = await this.ordersRepository.findById(orderId)

    if (!existOrder) {
      throw new OrdersNotFoundException(this.logger)
    }

    if (existOrder.isDone) {
      throw new OrderIsDoneException(this.logger, orderId)
    }

    const orderEntity = new TrainingOrdersEntity({
      ...existOrder,
      orderType: ORDER_TYPE,
      coachId: existOrder.coachId,
      totalPrice: (existOrder.trainingRestCount - 1) * existOrder.price,
      trainingDoneCount: existOrder.trainingDoneCount + 1,
      trainingRestCount: existOrder.trainingRestCount - 1,
      isDone: existOrder.trainingRestCount - 1 === 0 ? true : false
    });
    return this.ordersRepository.update(orderId, orderEntity);
  }

  public async delete(id: number) {
    const existOrder = await this.ordersRepository.findById(id);

    if (!existOrder) {
      throw new OrdersNotFoundException(this.logger)
    }
    return this.ordersRepository.destroy(existOrder._id);
  }

  public async showList(coachId: number, query: TrainingOrdersQuery) {
    const existOrder = await this.ordersRepository.findByCoachId(coachId, query);

    if (!existOrder) {
      throw new OrdersNotFoundException(this.logger)
    }
    return existOrder;
  }

  public async showListByUser(userId: string, query: TrainingOrdersQuery) {
    const existOrder = await this.ordersRepository.findByUserId(userId, query);

    if (!existOrder) {
      throw new OrdersNotFoundException(this.logger)
    }
    return existOrder;
  }

  public async show(id: number) {
    const existOrder = await this.ordersRepository.findById(id);

    if (!existOrder) {
      throw new OrdersNotFoundException(this.logger)
    }
    return existOrder;
  }

}
