import { StorageKey } from '../types';

export const localStorageRepoBase = 'budgety-fake';
export type LocalStorageItem = `${typeof localStorageRepoBase}-${StorageKey}`;
export type LocalStorageSearchQuery = { [key: string]: string | undefined };

export interface IRepository<T> {
  create(el: T): Promise<void | Error>;
  read(id: string | undefined): Promise<T | Error | undefined>;
  update(el: T): Promise<void | Error>;
  delete(id: string): Promise<void | Error>;
  list(): Promise<T[] | Error>;
  search(query?: LocalStorageSearchQuery): Promise<T[] | Error>;
}
