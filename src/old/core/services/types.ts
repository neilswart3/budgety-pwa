import { IBaseCollectionItem } from '../models';
import { LocalStorageRepository } from '../repositories';

export type RepositoryTypes<T extends IBaseCollectionItem> =
  LocalStorageRepository<T>;

export type ServiceSearchQuery = { [key: string]: string | undefined };

export interface IService<T extends IBaseCollectionItem> {
  create(el: T): Promise<void | Error>;
  read(id: string | undefined): Promise<T | Error | undefined>;
  update(el: T): Promise<void | Error>;
  delete(id: string): Promise<void | Error>;
  list(): Promise<T[] | Error>;
  search(query: ServiceSearchQuery): Promise<T[] | Error>;
}
