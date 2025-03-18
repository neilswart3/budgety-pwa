import { StorageKey } from '../types';
import { ICollection, ICollectionItemType, ServiceTypes } from './types';

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

  async fetchItem(id: string): Promise<T | Error> {
    try {
      return this.service.read(id);
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }

  async fetchAll(): Promise<Error | T[]> {
    try {
      return await this.service.search();
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }

  async updateItem(id: string): Promise<void | Error> {
    try {
      await this.updateItem(id);
    } catch (error) {
      throw new Error((error as Error).message);
    }
    throw new Error('Method not implemented.');
  }

  async deleteItem(id: string): Promise<void | Error> {
    try {
      await this.service.delete(id);
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }

  async search(query?: unknown): Promise<Error | T[]> {
    try {
      console.log('search query:', query);

      return await this.service.search();
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }
}
