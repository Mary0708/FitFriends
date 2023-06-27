import { plainToInstance, ClassConstructor, ClassTransformOptions } from 'class-transformer';

export function fillObject<T, V>(someDto: ClassConstructor<T>, plainObject: V, groups?: string[]) {
    const options: ClassTransformOptions = { excludeExtraneousValues: true };
    if (groups) {
      options.groups = [...groups];
    }
  
    return plainToInstance(someDto, plainObject, options);
  }

  export function transformToMax(value: unknown, borderMin: number, borderMax: number) {
    const max = +value;
    if (!max || (max < borderMin) || (max > borderMax)) {
      return borderMax;
    }
  
    return max;
  }