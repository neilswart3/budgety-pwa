import { IBaseCategoryItem, ICategoryItem } from '../models';
import {
  CategoryItemModel,
  ICategoryItemModelPayload,
} from '../models/CategoryItemModel';
import { StorageService } from '../services';
import { StorageKey } from '../types';
import Collection from './Collection';

class CategoryCollectionClass extends Collection<
  ICategoryItem,
  StorageKey.CATEGORIES
> {
  constructor() {
    super(StorageKey.CATEGORIES, StorageService);
  }

  async createItem(payload: ICategoryItemModelPayload): Promise<void | Error> {
    try {
      await this.service.create(new CategoryItemModel(payload));
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }

  async updateItem(
    payload: ICategoryItemModelPayload & { id: string }
  ): Promise<void | Error> {
    try {
      const currentItem = (await this.service.read(
        payload.id
      )) as IBaseCategoryItem;

      await this.service.update(
        new CategoryItemModel({ ...currentItem, ...payload })
      );
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }
}

export const CategoryCollection = new CategoryCollectionClass();
