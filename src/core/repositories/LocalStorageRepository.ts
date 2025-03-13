import { IRepository, LocalStorageItem, localStorageRepoBase } from './types';
import { StorageKey } from '../types';
import { ICollectionItem } from '../collections';

export class LocalStorageRepository<T extends ICollectionItem>
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
      const entries = await this.search();

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

  async read(id: string): Promise<T | Error> {
    try {
      const entries = (await this.search()) as T[];
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
      const entries = await this.search();

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
      const entries = (await this.search()) as T[];
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

  async search(): Promise<T[] | Error> {
    try {
      const entries = window?.localStorage?.getItem(this.item);

      if (entries === null)
        throw new Error(`Storage key "${this.key}" does not exist.`);

      return Promise.resolve(JSON.parse(entries));
    } catch (error) {
      throw new Error(
        `LocalStorageRepository.search: ${(error as Error).message}`
      );
    }
  }
}
