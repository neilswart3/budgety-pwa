import { IAccountItem } from '../models';
import { StorageService } from '../services';
import { StorageKey } from '../types';
import Collection from './Collection';

export class AccountCollection extends Collection<
  IAccountItem,
  StorageKey.ACCOUNTS
> {
  constructor() {
    super(StorageKey.ACCOUNTS, StorageService);
  }
}
