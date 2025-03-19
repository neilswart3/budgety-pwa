import { ICategoryItem } from '../models';
import { StorageService } from '../services';
import { StorageKey } from '../types';
import Collection from './Collection';

export class CategoryCollection extends Collection<
  ICategoryItem,
  StorageKey.CATEGORIES
> {
  constructor() {
    super(StorageKey.CATEGORIES, StorageService);
  }
}
