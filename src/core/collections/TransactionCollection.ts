import {
  IBaseTransactionItem,
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

  async updateItem(
    payload: ITransactionItemModelPayload & { id: string }
  ): Promise<void | Error> {
    try {
      const currentItem = (await this.service.read(
        payload.id
      )) as IBaseTransactionItem;

      await this.service.update(
        new TransactionItemModel({ ...currentItem, ...payload })
      );
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }

  async search(query?: {
    transactionId?: string;
    categoryId?: string;
  }): Promise<Error | ITransactionItem[]> {
    try {
      console.log('query:', query);

      const entries = await this.service.search();

      if (!entries) throw new Error('No entries found');

      return (entries as ITransactionItem[]).filter((e) =>
        [
          ...(query?.transactionId ? [e.id === query.transactionId] : []),
          ...(query?.categoryId ? [e.category === query.categoryId] : []),
        ].every(Boolean)
      );
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }
}
