import { CollectionKey } from '@/constants';
import { CollectionItems } from '../models';

export abstract class CollectionController<
  T extends CollectionItems = CollectionItems
> {
  abstract key: CollectionKey;

  abstract list(): Promise<T[] | Error>;
  abstract search(
    query: Partial<Record<keyof T, string[]>>
  ): Promise<T[] | Error>;
  abstract item(id: string): Promise<T | Error>;

  abstract create(payload: object): Promise<void | Error>;
  abstract update(payload: object): Promise<void | Error>;
  abstract delete(id: string): Promise<void | Error>;
}
