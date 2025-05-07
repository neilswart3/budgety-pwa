import { IBaseCollectionItem } from '../models';
import { StorageKey } from '../types';
import { IService, RepositoryTypes, ServiceSearchQuery } from './types';

export default class Service<
  T extends IBaseCollectionItem,
  K extends StorageKey,
  R extends new (key: StorageKey) => RepositoryTypes<T> = new (
    key: StorageKey
  ) => RepositoryTypes<T>
> implements IService<T>
{
  protected repository: RepositoryTypes<T>;

  constructor(key: K, RepoClass: R) {
    this.repository = new RepoClass(key);
  }

  async create(el: T): Promise<void | Error> {
    try {
      this.repository.create(el);
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }

  async read(id: string | undefined): Promise<T | Error | undefined> {
    try {
      return this.repository.read(id);
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }

  async update(el: T & { id: string }): Promise<void | Error> {
    try {
      await this.repository.update(el);
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }

  async delete(id: string): Promise<void | Error> {
    try {
      return this.repository.delete(id);
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }

  async list(): Promise<Error | T[]> {
    try {
      return await this.repository.list();
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }

  async search(
    query: ServiceSearchQuery | undefined = undefined
  ): Promise<Error | T[]> {
    try {
      return await this.repository.search(query);
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }
}
