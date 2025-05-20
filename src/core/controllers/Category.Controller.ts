import { CollectionKey } from '@/constants';
import { CollectionController } from './Collection.Controller';
import { LocalStorageRepository } from '../repositories';
import { Category, ICategory, ICategoryPayload } from '../models';

export class CategoryController extends CollectionController {
  key: CollectionKey;
  repository: LocalStorageRepository<Category>;

  constructor() {
    super();

    this.key = CollectionKey.CATEGORIES;
    this.repository = new LocalStorageRepository(this.key);
  }

  list = async (): Promise<Category[] | Error> => {
    try {
      return await this.repository.list();
    } catch (error) {
      throw new Error((error as Error).message);
    }
  };

  search = async (query = {}): Promise<Category[] | Error> => {
    try {
      return await this.repository.search(query);
    } catch (error) {
      throw new Error((error as Error).message);
    }
  };

  item = async (id: string): Promise<Category | Error> => {
    try {
      return await this.repository.item(id);
    } catch (error) {
      throw new Error((error as Error).message);
    }
  };

  create = async (payload: ICategoryPayload | Category): Promise<void> => {
    try {
      const newElement =
        payload instanceof Category ? payload : new Category(payload);

      await this.repository.create(newElement);
    } catch (error) {
      throw new Error((error as Error).message);
    }
  };

  update = async (payload: ICategory): Promise<void | Error> => {
    try {
      const updatedItem = new Category({
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
