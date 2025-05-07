import { IAccountItem } from '../models';
import { StorageService } from '../services';
import { StorageKey } from '../types';
import Collection from './Collection';

class AccountCollectionClass extends Collection<
  IAccountItem,
  StorageKey.ACCOUNTS
> {
  constructor() {
    super(StorageKey.ACCOUNTS, StorageService);
  }
}

export const AccountCollection = new AccountCollectionClass();
