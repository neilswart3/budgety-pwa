import { ICollectionItem } from '../collections';
import { LocalStorageRepository } from '../repositories';
import { StorageKey } from '../types';
import Service from './Service';

export class StorageService<T extends ICollectionItem> extends Service<
  T,
  StorageKey
> {
  constructor(key: StorageKey) {
    super(key, LocalStorageRepository);
  }
}
