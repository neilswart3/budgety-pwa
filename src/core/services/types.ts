import { IBaseCollectionItem } from '../models';
import { LocalStorageRepository } from '../repositories';

export type RepositoryTypes<T extends IBaseCollectionItem> =
  LocalStorageRepository<T>;

export interface IService<T extends IBaseCollectionItem> {
  create(el: T): Promise<void | Error>;
  read(id: string): Promise<T | Error>;
  update(el: T): Promise<void | Error>;
  delete(id: string): Promise<void | Error>;
  search(): Promise<T[] | Error>;
}
