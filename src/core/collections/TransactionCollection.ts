import { StorageService } from '../services';
import { StorageKey } from '../types';
import Collection from './Collection';
import { ITransactionItem } from './types';

export class TransactionCollection extends Collection<
  ITransactionItem,
  StorageKey.TRANSACTIONS
> {
  constructor() {
    super(StorageKey.TRANSACTIONS, StorageService);
  }
}
