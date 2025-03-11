import { ICollection } from '../collections';
import { StorageKey } from '../types';
import { IService, RepositoryTypes } from './types';

export default class BaseService<
  T extends ICollection,
  K extends StorageKey,
  R extends new (key: StorageKey) => RepositoryTypes<T>
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

  async read(id: string): Promise<T | Error> {
    try {
      return this.repository.read(id);
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }

  update(id: string): Promise<void | Error> {
    try {
      return this.repository.delete(id);
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }

  delete(id: string): Promise<void | Error> {
    try {
      return this.repository.delete(id);
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }

  async search(): Promise<Error | T[]> {
    try {
      return await this.repository.search();
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }
}
