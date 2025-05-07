import {
  IAccountItem,
  ICategoryItem,
  ITransactionItem,
} from '@/old/core/models';
import { StorageService } from '@/old/core/services';

export type ServiceTypes<T extends ICollectionItemType> = StorageService<T>;

export type CollectionSearchQueryArg<T extends ICollectionItemType> =
  | Partial<Record<keyof Partial<T>, string | undefined>>
  | undefined;

export interface ICollection<T extends ICollectionItemType> {
  createItem(el: T): Promise<void | Error>;
  fetchItem(id: string | undefined): Promise<T | Error | undefined>;
  fetchAll(): Promise<T[] | Error>;
  updateItem(el: T & { id: string }): Promise<void | Error>;
  deleteItem(id: string): Promise<void | Error>;
  search(query: CollectionSearchQueryArg<T>): Promise<T[] | Error>;
}

export type ICollectionItemType =
  | ITransactionItem
  | ICategoryItem
  | IAccountItem;
