import { ITransactionItem } from '@/core/models';
import { StorageService } from '@/core/services';
import { StorageKey } from '@/core';
import Collection from './Collection';

export class TransactionCollection extends Collection<
  ITransactionItem,
  StorageKey.TRANSACTIONS
> {
  constructor() {
    super(StorageKey.TRANSACTIONS, StorageService);
  }
}
