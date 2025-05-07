import {
  IRepository,
  LocalStorageItem,
  localStorageRepoBase,
  LocalStorageSearchQuery,
} from './types';
import { StorageKey } from '../types';
import { IBaseCollectionItem } from '../models';

export class LocalStorageRepository<T extends IBaseCollectionItem>
  implements IRepository<T>
{
  private key: StorageKey;
  private item: LocalStorageItem;

  constructor(key: StorageKey) {
    this.key = key;
    this.item = `${localStorageRepoBase}-${key}`;
  }

  async create(el: T): Promise<void | Error> {
    try {
      const entries = await this.list();

      Promise.resolve(
        window.localStorage.setItem(
          this.item,
          JSON.stringify([el, ...(entries as T[])])
        )
      );
    } catch (error) {
      throw new Error(
        `LocalStorageRepository.create: ${(error as Error).message}`
      );
    }
  }

  async read(id: string | undefined): Promise<T | Error | undefined> {
    try {
      if (!id) return;

      const entries = (await this.list()) as T[];
      const entry = entries?.find((e) => e.id === id);

      if (!entry)
        throw new Error(`The ${this.key} id "${id}" could not be found.`);

      return Promise.resolve(entry);
    } catch (error) {
      throw new Error(
        `LocalStorageRepository.read: ${(error as Error).message}`
      );
    }
  }

  async update(el: T): Promise<void | Error> {
    try {
      const entries = await this.list();

      const newEntries = (entries as T[]).reduce(
        (acc: T[], item: T) =>
          el.id === item.id ? [...acc, el] : [...acc, item],
        []
      );

      Promise.resolve(
        window.localStorage.setItem(this.item, JSON.stringify(newEntries))
      );
    } catch (error) {
      throw new Error(
        `LocalStorageRepository.update: ${(error as Error).message}`
      );
    }
  }

  async delete(id: string): Promise<void | Error> {
    try {
      const entries = (await this.list()) as T[];
      const entry = entries?.find((e) => e.id === id);

      if (!entry?.id)
        throw new Error(`The ${this.key} id "${id}" could not be found.`);

      const remaining = entries.filter((e) => e.id !== id);

      Promise.resolve(
        window.localStorage.setItem(this.item, JSON.stringify(remaining))
      );
    } catch (error) {
      throw new Error(
        `LocalStorageRepository.delete: ${(error as Error).message}`
      );
    }
  }

  async list(): Promise<T[] | Error> {
    try {
      const entries = window?.localStorage?.getItem(this.item);

      if (entries === null) {
        window?.localStorage?.setItem(this.item, JSON.stringify([]));
        return await this.list();
      }

      return Promise.resolve(JSON.parse(entries));
    } catch (error) {
      throw new Error(
        `LocalStorageRepository.list: ${(error as Error).message}`
      );
    }
  }

  async search(
    query: LocalStorageSearchQuery | undefined = undefined
  ): Promise<T[] | Error> {
    try {
      const entries = await this.list();

      if (!query || !Object.values(query).filter(Boolean).length)
        return entries;

      if (!entries) throw new Error('No entries found for this key');
      if (entries instanceof Error) throw new Error(entries.message);

      const queryArr = Object.entries(query);
      const entriesWithQuery = entries.filter((entry) =>
        queryArr.every(
          ([key, value]) => entry[key as keyof typeof entry] === value
        )
      );

      return await Promise.resolve(entriesWithQuery);
    } catch (error) {
      throw new Error(
        `LocalStorageRepository.search: ${(error as Error).message}`
      );
    }
  }
}
