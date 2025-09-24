import { CollectionKey } from '@/constants';
import { CollectionController } from './Collection.Controller';
import { LocalStorageRepository } from '../repositories';
import {
  CollectionItems,
  CollectionModelPayloadTypes,
  CollectionModelType,
} from '../models';

export class BaseCollectionController<
  T extends CollectionItems,
  P extends CollectionModelPayloadTypes,
  M extends CollectionModelType
> extends CollectionController {
  key: CollectionKey;
  Model: new (payload: P) => M;
  repository: LocalStorageRepository<T>;

  constructor({
    key,
    model,
  }: {
    key: CollectionKey;
    model: new (payload: P) => M;
  }) {
    super();

    this.key = key;
    this.Model = model;
    this.repository = new LocalStorageRepository(this.key);
  }

  list = async (): Promise<T[] | Error> => {
    try {
      return await this.repository.list();
    } catch (error) {
      throw new Error((error as Error).message);
    }
  };

  search = async (query = {}): Promise<T[] | Error> => {
    try {
      return await this.repository.search(query);
    } catch (error) {
      throw new Error((error as Error).message);
    }
  };

  item = async (id: string): Promise<T | Error> => {
    try {
      return await this.repository.item(id);
    } catch (error) {
      throw new Error((error as Error).message);
    }
  };

  create = async (payload: P): Promise<void> => {
    try {
      //   await this.repository.create(
      //     payload instanceof T ? payload : new this.Model(payload)
      //   );

      const newThing = new this.Model(payload);

      await this.repository.create(newThing as unknown as T);
    } catch (error) {
      throw new Error((error as Error).message);
    }
  };

  update = async (payload: P): Promise<void | Error> => {
    try {
      const updatedItem = new this.Model({
        ...payload,
        modifiedAt: new Date().toISOString(),
      } as P);

      await this.repository.update(updatedItem as unknown as T);
    } catch (error) {
      throw new Error((error as Error).message);
    }
  };

  delete = async (id: string): Promise<void | Error> => {
    try {
      await this.repository.delete(id);
    } catch (error) {
      throw new Error((error as Error).message);
    }
  };
}
