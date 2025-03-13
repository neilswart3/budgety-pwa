import { StorageKey } from '../types';

export const localStorageRepoBase = 'budgety-fake';
export type LocalStorageItem = `${typeof localStorageRepoBase}-${StorageKey}`;

export interface IRepository<T> {
  create(el: T): Promise<void | Error>;
  read(id: string): Promise<T | Error>;
  update(el: T): Promise<void | Error>;
  delete(id: string): Promise<void | Error>;
  search(): Promise<T[] | Error>;
}
