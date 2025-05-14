import { CollectionKey } from '@/constants';
import { CollectionController } from './Collection.Controller';
import { LocalStorageRepository } from '../repositories';
import { Transaction } from '../models';
import { ITransaction, ITransactionPayload } from '../models/Transaction/types';

export class TransactionController extends CollectionController {
  key: CollectionKey;
  repository: LocalStorageRepository<Transaction>;

  constructor() {
    super();

    this.key = CollectionKey.TRANSACTIONS;
    this.repository = new LocalStorageRepository(this.key);
  }

  list = async (): Promise<Transaction[] | Error> => {
    try {
      return await this.repository.list();
    } catch (error) {
      throw new Error((error as Error).message);
    }
  };

  search = async (query = {}): Promise<Transaction[] | Error> => {
    try {
      return await this.repository.search(query);
    } catch (error) {
      throw new Error((error as Error).message);
    }
  };

  item = async (id: string): Promise<Transaction | Error> => {
    try {
      return await this.repository.item(id);
    } catch (error) {
      throw new Error((error as Error).message);
    }
  };

  create = async (payload: ITransactionPayload): Promise<void> => {
    try {
      await this.repository.create(new Transaction(payload));
    } catch (error) {
      throw new Error((error as Error).message);
    }
  };

  update = async (payload: ITransaction): Promise<void | Error> => {
    try {
      const updatedItem = new Transaction({
        ...payload,
        modifiedAt: new Date().toISOString(),
      });

      await this.repository.update(updatedItem);
    } catch (error) {
      throw new Error((error as Error).message);
    }
  };

  delete = async (id: string): Promise<void | Error> => {
    try {
      await this.repository.delete(id);
    } catch (error) {
      throw new Error((error as Error).message);
    }
  };
}
