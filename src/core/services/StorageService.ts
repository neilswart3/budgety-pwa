import { ICollection } from '../collections';
import { LocalStorageRepository } from '../repositories';
import { StorageKey } from '../types';
import BaseService from './BaseService';
import { RepositoryTypes } from './types';

export class StorageService<T extends ICollection> extends BaseService<
  T,
  StorageKey,
  new (key: StorageKey) => RepositoryTypes<T>
> {
  constructor(key: StorageKey) {
    super(key, LocalStorageRepository);
  }
}
