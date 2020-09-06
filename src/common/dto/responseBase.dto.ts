import { plainToClass } from 'class-transformer';

type Constructor<T> = { new (): T };

/**
 *  Common response base dto.
 *  'Polymorphic this' concept is used
 */
export class ResponseBase {
  public static fromEntity<T>(
    this: Constructor<T>,
    obj: Record<string, any>,
  ): T {
    return plainToClass(this, obj, {
      excludeExtraneousValues: true,
    });
  }

  public static fromEntityList<T>(
    this: Constructor<T>,
    objList: Record<string, any>[],
  ): T[] {
    return objList.map(data =>
      plainToClass(this, data, {
        excludeExtraneousValues: true,
      }),
    );
  }
}
