import { CollectionKey } from '@/constants';
import { CollectionController } from './Collection.Controller';
import { LocalStorageRepository } from '../repositories';
import { Saving } from '../models';
import { ISaving, ISavingPayload } from '../models/Saving/types';

export class SavingController extends CollectionController {
  key: CollectionKey;
  repository: LocalStorageRepository<Saving>;

  constructor() {
    super();

    this.key = CollectionKey.SAVINGS;
    this.repository = new LocalStorageRepository(this.key);
  }

  list = async (): Promise<Saving[] | Error> => {
    try {
      return await this.repository.list();
    } catch (error) {
      throw new Error((error as Error).message);
    }
  };

  search = async (query = {}): Promise<Saving[] | Error> => {
    try {
      return await this.repository.search(query);
    } catch (error) {
      throw new Error((error as Error).message);
    }
  };

  item = async (id: string): Promise<Saving | Error> => {
    try {
      return await this.repository.item(id);
    } catch (error) {
      throw new Error((error as Error).message);
    }
  };

  create = async (payload: ISavingPayload): Promise<void> => {
    try {
      await this.repository.create(new Saving(payload));
    } catch (error) {
      throw new Error((error as Error).message);
    }
  };

  update = async (payload: ISaving): Promise<void | Error> => {
    try {
      const updatedItem = new Saving({
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
