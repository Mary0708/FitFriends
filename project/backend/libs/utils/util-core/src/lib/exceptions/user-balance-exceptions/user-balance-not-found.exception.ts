import { Logger, NotFoundException } from '@nestjs/common';

export class UserBalanceNotFoundIdException extends NotFoundException {
  constructor(
    private readonly logger: Logger,
    userId: number
  ) {
    super(`The balance of the user with ${userid} was not found`);
  }
}
