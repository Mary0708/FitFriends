import { plainToInstance, ClassConstructor, ClassTransformOptions } from 'class-transformer';
import { existsSync, mkdirSync } from 'fs';
import { HttpException, HttpStatus } from '@nestjs/common';
import { extname } from 'path';

export function getRandomInteger(a = 0, b = 1) {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
}

export function getMongoConnectionString({name, password, host, port, databaseName, authDatabase}): string {
  return `mongodb://${name}:${password}@${host}:${port}/${databaseName}?authSource=${authDatabase}`;
}
export function getRabbitMQConnectionString({user, password, host, port}): string {

  return `amqp://${user}:${password}@${host}:${port}`;
}

export function getFriendRemove(name: string) {
  return `The user ${name} has removed you from the friends list`;
}

export function fillObject<T, V>(someDto: ClassConstructor<T>, plainObject: V, groups?: string[]) {
  const options: ClassTransformOptions = { excludeExtraneousValues: true };
  
  if (groups) {
    options.groups = [...groups];
  }

  return plainToInstance(someDto, plainObject, options);
}

export function transformToMin(value: unknown, borderMin: number, borderMax: number) {
  const min = +value;
  
  if (!min || (min < borderMin) || (min > borderMax)) {
    return borderMin;
  }

  return min;
}

export function transformToMax(value: unknown, borderMin: number, borderMax: number) {
  const max = +value;
  
  if (!max || (max < borderMin) || (max > borderMax)) {
    return borderMax;
  }

  return max;
}

export function transformStringToBool(value: unknown) {
  if ((value === 'true') || (value === '1')) {
    return true;
  }

  if ((value === 'false') || (value === '0')) {
    return false;
  }

  return undefined;
}

export function isFolderExistsOrCreate(path: string) {
  const isFolderExists = existsSync(path) || mkdirSync(path, { recursive: true });
  
  if (!isFolderExists) {
    new HttpException('Error while attempt to create file', HttpStatus.BAD_REQUEST);
  }
}
