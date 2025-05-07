import { StorageKey } from '../types';
import {
  CollectionSearchQueryArg,
  ICollection,
  ICollectionItemType,
  ServiceTypes,
} from './types';

export default class Collection<
  T extends ICollectionItemType,
  K extends StorageKey,
  R extends new (key: StorageKey) => ServiceTypes<T> = new (
    key: StorageKey
  ) => ServiceTypes<T>
> implements ICollection<T>
{
  protected service: ServiceTypes<T>;

  constructor(key: K, StorageClass: R) {
    this.service = new StorageClass(key);
  }

  async createItem(el: T): Promise<void | Error> {
    try {
      await this.service.create(el);
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }

  async fetchItem(id: string | undefined): Promise<T | Error | undefined> {
    try {
      return this.service.read(id);
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }

  async fetchAll(): Promise<Error | T[]> {
    try {
      return await this.service.list();
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }

  async updateItem(el: T & { id: string }): Promise<void | Error> {
    try {
      await this.service.update(el);
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }

  async deleteItem(id: string): Promise<void | Error> {
    try {
      await this.service.delete(id);
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }

  async search(
    query: CollectionSearchQueryArg<T> = undefined
  ): Promise<Error | T[]> {
    try {
      return await this.service.search(query);
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }
}
