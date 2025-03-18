import {
  ITransactionItem,
  ITransactionItemModelPayload,
  TransactionItemModel,
} from '@/core/models';
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

  async createItem(
    payload: ITransactionItemModelPayload
  ): Promise<void | Error> {
    try {
      await this.service.create(new TransactionItemModel(payload));
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }
}
