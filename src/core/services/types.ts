import { ICollectionItem } from '../collections';
import { LocalStorageRepository } from '../repositories';

export type RepositoryTypes<T extends ICollectionItem> =
  LocalStorageRepository<T>;

export interface IService<T extends ICollectionItem> {
  create(el: T): Promise<void | Error>;
  read(id: string): Promise<T | Error>;
  update(el: T): Promise<void | Error>;
  delete(id: string): Promise<void | Error>;
  search(): Promise<T[] | Error>;
}
