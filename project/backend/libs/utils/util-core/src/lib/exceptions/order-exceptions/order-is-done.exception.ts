import { Logger, NotFoundException } from '@nestjs/common';

export class OrderIsDoneException extends NotFoundException {
  constructor(
    private readonly logger: Logger,
    id: number
  ) {
    super(`Order with the id — ${id} done`);
  }
}
