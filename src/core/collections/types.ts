import { ITransactionItem } from '@/core/models';
import { StorageService } from '@/core/services';

export type ServiceTypes<T extends ICollectionItemType> = StorageService<T>;

export interface ICollection<T extends ICollectionItemType> {
  createItem(el: T): Promise<void | Error>;
  fetchItem(id: string): Promise<T | Error>;
  fetchAll(): Promise<T[] | Error>;
  updateItem(id: string): Promise<void | Error>;
  deleteItem(id: string): Promise<void | Error>;
  search(query: unknown): Promise<T[] | Error>;
}

export type ICollectionItemType = ITransactionItem;
