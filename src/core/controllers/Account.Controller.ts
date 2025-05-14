import { CollectionKey } from '@/constants';
import { CollectionController } from './Collection.Controller';
import { LocalStorageRepository } from '../repositories';
import { Account } from '../models';
import { IAccount, IAccountPayload } from '../models/Account/types';

export class AccountController extends CollectionController {
  key: CollectionKey;
  repository: LocalStorageRepository<Account>;

  constructor() {
    super();

    this.key = CollectionKey.ACCOUNTS;
    this.repository = new LocalStorageRepository(this.key);
  }

  list = async (): Promise<Account[] | Error> => {
    try {
      return await this.repository.list();
    } catch (error) {
      throw new Error((error as Error).message);
    }
  };

  search = async (query = {}): Promise<Account[] | Error> => {
    try {
      return await this.repository.search(query);
    } catch (error) {
      throw new Error((error as Error).message);
    }
  };

  item = async (id: string): Promise<Account | Error> => {
    try {
      return await this.repository.item(id);
    } catch (error) {
      throw new Error((error as Error).message);
    }
  };

  create = async (payload: IAccountPayload): Promise<void> => {
    try {
      await this.repository.create(new Account(payload));
    } catch (error) {
      throw new Error((error as Error).message);
    }
  };

  update = async (payload: IAccount): Promise<void | Error> => {
    try {
      const updatedItem = new Account({
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
