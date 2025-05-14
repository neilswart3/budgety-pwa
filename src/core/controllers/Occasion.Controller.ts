import { CollectionKey } from '@/constants';
import { CollectionController } from './Collection.Controller';
import { LocalStorageRepository } from '../repositories';
import { IOccasionPayload } from '../models/Occasion/types';
import { Occasion } from '../models';

export class OccasionController extends CollectionController {
  key: CollectionKey;
  repository: LocalStorageRepository<Occasion>;

  constructor() {
    super();

    this.key = CollectionKey.OCCASIONS;
    this.repository = new LocalStorageRepository(this.key);
  }

  list = async (): Promise<Occasion[] | Error> => {
    try {
      return await this.repository.list();
    } catch (error) {
      throw new Error((error as Error).message);
    }
  };

  search = async (query = {}): Promise<Occasion[] | Error> => {
    try {
      return await this.repository.search(query);
    } catch (error) {
      throw new Error((error as Error).message);
    }
  };

  item = async (id: string): Promise<Occasion | Error> => {
    try {
      return await this.repository.item(id);
    } catch (error) {
      throw new Error((error as Error).message);
    }
  };

  create = async (payload: IOccasionPayload): Promise<void> => {
    try {
      await this.repository.create(new Occasion(payload));
    } catch (error) {
      throw new Error((error as Error).message);
    }
  };

  update = async (payload: IOccasionPayload): Promise<void | Error> => {
    try {
      const updatedItem = new Occasion({
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
