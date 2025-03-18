import { IBaseCollectionItem } from '../models';
import { LocalStorageRepository } from '../repositories';
import { StorageKey } from '../types';
import Service from './Service';

export class StorageService<T extends IBaseCollectionItem> extends Service<
  T,
  StorageKey
> {
  constructor(key: StorageKey) {
    super(key, LocalStorageRepository);
  }
}
