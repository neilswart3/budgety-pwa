import {
  IBaseTransactionItem,
  ITransactionItem,
  ITransactionItemModelPayload,
  TransactionItemModel,
} from '@/old/core/models';
import { StorageService } from '@/old/core/services';
import { StorageKey } from '../types';
import Collection from './Collection';

class TransactionCollectionClass extends Collection<
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
}

export const TransactionCollection = new TransactionCollectionClass();
