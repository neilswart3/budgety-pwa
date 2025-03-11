import { ICollection } from '../collections';
import { LocalStorageRepository } from '../repositories';

export type RepositoryTypes<T extends ICollection> = LocalStorageRepository<T>;

export interface IService<T extends ICollection> {
  create(el: T): Promise<void | Error>;
  read(id: string): Promise<T | Error>;
  update(id: string): Promise<void | Error>;
  delete(id: string): Promise<void | Error>;
  search(): Promise<T[] | Error>;
}
